import { useState, useEffect } from 'react'
import UserNavigation from '../components/UserNavigation'
import { useSelector } from 'react-redux'
import { getOrders } from '../helperFunctions/authFunction'
import DisplayPaymentInfo from '../components/DisplayPaymentInfo'

const UserDashboardPage = () => {
  const [showNav, setShowNav] = useState(true)
  const [orders, setOrders] = useState([])

  const userInfo = useSelector((state) => state.user)

  useEffect(() => {
    importOrders()
  }, [])

  const importOrders = () =>
    getOrders(userInfo.token).then((resp) => {
      setOrders(resp.data)
    })

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className={`${showNav && 'col-md-2 text-center'}`}>
          <UserNavigation showNav={showNav} setShowNav={setShowNav} />
        </div>
        <div className='col text-center pt-5'>
          <h4>
            {orders.length > 0 ? 'Purchased Orders' : 'No orders to display'}
          </h4>

          {orders.map((order, i) => (
            <div key={i} className='m-5 p-3 card'>
              <DisplayPaymentInfo order={order} />
              <table className='table table-bordered'>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Tour</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Duration</th>
                    <th scope='col'>Difficulty</th>
                    <th scope='col'>Start Date</th>
                  </tr>
                </thead>
                {console.log(order)}
                <tbody>
                  <tr>
                    <td>
                      <b className='text-info'>{order.tour.title}</b>
                    </td>

                    <td className='text-info'>{order.orderStatus}</td>
                    <td className='text-info'>
                      {(order.paymentIntent.amount /= 100).toLocaleString(
                        'en-US',
                        {
                          style: 'currency',
                          currency: 'USD',
                        }
                      )}
                    </td>
                    <td className='text-info'>
                      {order.tour.duration}{' '}
                      {order.tour.duration < 2 ? 'Day' : 'Days'}
                    </td>

                    <td className='text-info'>{order.tour.difficulty}</td>
                    <td className='text-info'>
                      {order.tour.startDate.substring(0, 10)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='row'>
                <div className='col'>
                  <p className='paymentinfo-heading pt-3'>Download PDF</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDashboardPage
