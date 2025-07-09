import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/dashboardlayout'
import { API_PATHS } from '../../utils/apiPaths';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import axiosInstance from '../../utils/axiosInstance'
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';
import { toast } from 'react-hot-toast';

const Expense = () => {
  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false)

  const fetchExpenseDetails = async () => {
    if (loading) return

    setLoading(true)
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      console.log(response)
      if (response.data) {
        setExpenseData(response.data)
      }
    } catch (error) {
      console.log("Something went wrong , Please try again later", error)
    } finally {
      setLoading(false)
    }
  }

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //validation check
    if (!category.trim()) {
      toast.error("category is required")
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully")
      fetchExpenseDetails();

    } catch (error) {
      console.log("error adding income", error.response?.data?.message || error.message)
    }
  }
  //Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
      setOpenDeleteAlert({ show: false, data: null })
      fetchExpenseDetails();
    } catch (error) {
      console.log(error.response)
    }
  }

  //Handle download Expense details
  const handleDownloadExpenseDetails = async () => { 
    try{
      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE ,{
        responseType:"blob",
      });

      // create a URl for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download","expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }catch(error){
      console.error("error downloading expense details:",error)
      toast.error("failed to download expense details. Please try again later")
    }
  }


  useEffect(() => {
    fetchExpenseDetails();
    return () => { }
  }, [])

  var checkExpense = expenseData.length === 0


  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-3'>
          <div>
            <ExpenseOverview 
            checkExpense={checkExpense}
            transaction={expenseData} 
            onAddExpense={() => setOpenAddExpenseModal(true)} />
          </div>


          {!checkExpense && (
            <ExpenseList
              transaction={expenseData}
              onDelete={(id) => {
                setOpenDeleteAlert({ show: true, data: id },
                );
              }}
              onDownload={handleDownloadExpenseDetails}
            />)}
        </div>


        {OpenAddExpenseModal && (<Modal
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Income"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>)}

        {openDeleteAlert.show &&
          (<Modal
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense"
              onDelete={() => deleteExpense(openDeleteAlert.data)}
            />
          </Modal>)}

      </div>
    </DashboardLayout>
  )
}

export default Expense