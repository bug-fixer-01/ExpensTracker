import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/dashboardlayout';
import { useUserAuth } from '../../Hooks/useUserAuth'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../../components/Cards/InfoCard';
import { IoMdCard } from 'react-icons/io';
import { addThousandSeparator } from '../../utils/helper';
import RecentTransactions from '../../components/Dashboard/RecentTransaction';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransaction from '../../components/Dashboard/ExpenseTransaction';
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses';
import { MdAddCard } from "react-icons/md";
import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/Dashboard/RecentIncome';

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const noTotalBalance = dashboardData?.totalBalance === 0;
  const negativeBalance = dashboardData?.totalBalance < 0
  const noExpense = !dashboardData?.last30DaysExpenses.transactions?.length;
  const noIncome = !dashboardData?.last60DaysIncome.transactions?.length
  const noRecentTransaction = noTotalBalance && noIncome && noExpense


  const fetchDashboardData = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        // console.log(response.data)
        setDashboardData(response.data);
      }
    }
    catch (error) {
      console.log("something went wrong, please try again.", error)
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
          />
          <InfoCard
            icon={<IoMdCard />}
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>

        <div className={`${noTotalBalance && noIncome ? "" : "hidden"} relative bg-white
         grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 rounded-2xl p-4 shadow-md shadow-gray-100 border border-gray-200/50`}>

          <div className='px-4 py-28 flex flex-col items-center text-center gap-16'>
            <div>
              <h5 className='text-lg'>Add Your Income</h5>
              <h3 className='text-3xl'>And Track your Expanses</h3>
            </div>


            <button className='card-btn' style={{ fontSize: '20px' }} onClick={() => { navigate("/income") }}>
              Add Income <MdAddCard />
            </button>
          </div>


          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

        </div>


        <div className={`${noRecentTransaction? "hidden" : "grid"} grid-cols-1 md:grid-cols-2 gap-6 mt-6`}>
          <RecentTransactions
            transaction={dashboardData?.recentTransaction}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            negativeBalance={negativeBalance}
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />

          <ExpenseTransaction
            Render={`${noExpense ? "hidden" : ""}`}
            transaction={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            Render={`${noExpense ? "hidden" : ""}`}
            data={dashboardData?.last30DaysExpenses?.transactions || []}

          />
          {!noIncome && (<RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 5) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          />)}
          {!noIncome && (<RecentIncome
            transaction={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate('/income')}
          />)}

        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home