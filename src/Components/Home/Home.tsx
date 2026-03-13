import { useContext, useEffect, useState } from "react";
import { FaUsers, FaUserCheck, FaUserShield, FaHourglassHalf } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { Table } from "react-bootstrap";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  status?: string;
}

interface AuthContextType {
    userData: User | null
  }

export default function Home() {

  const { userData } = useContext(AuthContext) as AuthContextType
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/users");
      setUsers(res.data.users.slice(0, 5));
    } catch{
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ minHeight: "calc(100vh - 62px)", backgroundColor: "#F8F8F8", padding: "2rem" }}>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Welcome back {userData?.firstName}!</h2>
      </div>

      
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="shadow-lg rounded-4 p-4 d-flex align-items-center">
            <FaUsers size={35} className="me-3 text-warning"/>
            <div>
              <h3>120</h3>
              <p>Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="shadow-lg rounded-4 p-4 d-flex align-items-center">
            <FaUserCheck size={35} className="me-3 text-success"/>
            <div>
              <h3>80</h3>
              <p>Active Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="shadow-lg rounded-4 p-4 d-flex align-items-center">
            <FaUserShield size={35} className="me-3 text-primary"/>
            <div>
              <h3>10</h3>
              <p>Admins</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="shadow-lg rounded-4 p-4 d-flex align-items-center">
            <FaHourglassHalf size={35} className="me-3 text-danger"/>
            <div>
              <h3>5</h3>
              <p>Pending Requests</p>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-lg rounded-4 p-4 bg-white">
        <h4 className="mb-3">Recent Users</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <Table hover style={{ borderCollapse: "separate", borderSpacing: "0 15px" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "User"}</td>
                    <td>{user.status || "Active"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}