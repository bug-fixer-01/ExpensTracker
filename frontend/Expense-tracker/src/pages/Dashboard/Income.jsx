import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/dashboardlayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import IncomeOverview from '../../components/Income/IncomeOverview';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from "react-hot-toast";
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert';

const income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false)


  //Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return

    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME)

      if (response.data) {
        setIncomeData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong , Please try again later", error)
    } finally {
      setLoading(false)
    }
  }

  //Handle Add Income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validation check
    if (!source.trim()) {
      toast.error("source is required")
      return;
    }

    if (!amount || isNaN(amount) || Number(amount <= 0)) {
      toast.error("amount should be a valid number greater than 0.")
      return;
    }

    if (!date) {
      toast.error("date is required")
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeDetails();

    } catch (error) {
      console.log("error adding income", error.response?.data?.message || error.message)
    }
  }
  //Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
      setOpenDeleteAlert({ show: false, data: null })
      fetchIncomeDetails();
    } catch (error) {
      console.log(error.response)
    }
  }

  //Handle download Income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
        responseType: "blob",
      });

      // create a URl for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("error downloading income details:", error)
      toast.error("failed to download income details. Please try again later")
    }
  }

  useEffect(() => {
    fetchIncomeDetails();
    return () => { }
  }, [])

  var checkIncome = incomeData.length === 0
  console.log(checkIncome)

  return (
    <DashboardLayout activeMenu="Income">
      <div className='my-5 mx-auto'>
        <div className=' grid grid-cols-1 gap-3'>
          <div className=''>
            <IncomeOverview
              checkIncome={checkIncome}
              transaction={incomeData.slice(0, 5)}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          {!checkIncome && (<IncomeList
            transaction={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id },
              );
            }}
            onDownload={handleDownloadIncomeDetails}
          />)}

        </div>

        {OpenAddIncomeModal &&
          <Modal
            onClose={() => setOpenAddIncomeModal(false)}
            title="Add Income"
          >
            <AddIncomeForm onAddIncome={handleAddIncome} />
          </Modal>}


        {openDeleteAlert.show &&
          (<Modal
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income"
              onDelete={() => deleteIncome(openDeleteAlert.data)}
            />
          </Modal>)}
      </div>
    </DashboardLayout>
  )
}

export default income