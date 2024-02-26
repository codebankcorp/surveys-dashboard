import Spinner from "components/Loading/Spinner"
import SuperAdminContext from "context/admin/adminContext"
import { useContext, useEffect, useState } from "react"
import { Col, Table, Card } from "react-bootstrap"
export default function TopUsersToday() {
  const context = useContext(SuperAdminContext)

  const { getEarningsToday, earningsToday } = context

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoading(true)
      getEarningsToday()
      setLoading(false)
    }
  })
  return (
    <>
      <Col md="12">
        <Card className="card-plain table-plain-bg">
          <Card.Header>
            <Card.Title as="h4">Top Users Earnings Today</Card.Title>
          </Card.Header>
          <Card.Body className="table-full-width table-responsive px-0">
            {loading ? <div className="d-flex justify-content-center align-items-center">
              <Spinner />
            </div> : <Table className="table-hover">
              <thead>
                <tr>
                  <th className="border-0">Rank</th>
                  <th className="border-0">Name</th>
                  <th className="border-0">Earning</th>
                  <th className="border-0">Signup Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  earningsToday && earningsToday.length > 0 ? (
                    earningsToday
                      .sort((a, b) => b.todayEarning - a.todayEarning)
                      .map((earning, i) => (
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{earning.user.name}</td>
                          <td>{earning.todayEarning}</td>
                          <td>{earning.user.date}</td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan="4">No earnings today</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>}

          </Card.Body>
        </Card>
      </Col>
    </>
  )
}