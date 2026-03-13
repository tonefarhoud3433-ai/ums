import axios from 'axios';
import { useEffect, useState } from 'react'
import { Modal, Spinner, Table , Button } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import { TbTrashX } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface User {
  id:number;
  image:string;
  firstName:string;
  lastName:string;
  email:string;
  phone:string;
  birthDate:string;
}

export default function UsersList() {
  //use navigate

  const navigate = useNavigate()

  // Modal
  const [show, setShow] = useState(false);
  const [userId,setUserId]=useState<number|null>(null)
  const [userData,setUserData]=useState<User|null>(null)

  const handleClose = () => setShow(false);
  const handleShow = (user:User) => {
    setShow(true);
    setUserId(user.id)
    setUserData(user)
  }


  const[users,setUsers]=useState<User[]>([])
  const [loading,setLoading] = useState(true)

  const moveToAddUser=()=>{
    navigate("/dashboard/add-user")
  }

  const deleteUser=async ()=>{
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`) 
      handleClose()
      toast.success(`${userData?.firstName} Deleted Successfully`)
      getUsers()
    } catch {
      toast.error("Something wrong happened");
    }
  }

  const getUsers=async ()=>{
    try {
      const response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users || null);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    getUsers( )
  },[])

  if(loading) return (<div className='d-flex justify-content-center mt-5'>
    <Spinner animation="border" variant="warning" />
  </div>)

  return (
    <div style={{backgroundColor:"#F8F8F8"}}>
      <div className={`mx-4 py-4`}>
        <div className="d-flex justify-content-between">
          <h3 className='fw-bold'>Users List</h3>
          <button onClick={moveToAddUser} className='btn btn-warning text-white'>Add New User</button>
        </div>
          <hr />
        <div>
          <Table hover style={{ borderCollapse: "separate", borderSpacing: "0 15px" }}>
            <thead>
              <tr>
                <th></th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date of admission</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user)=>(
                <tr key={user?.id}>
                <td><img src={user?.image} className='w-25' alt="User Picture" /></td>
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>{user?.birthDate}</td>
                <td>
                  <div className="d-flex justify-content-evenly">
                    <FaRegEdit size={25} onClick={()=> navigate(`/dashboard/edit-user/${user.id}`)} className='text-warning' />
                    <TbTrashX size={25} onClick={()=>handleShow(user)} className='text-danger' />
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm delete {userData?.firstName} {userData?.lastName} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Be Carful ! Are you sure you want continue ? </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={deleteUser}>
                Delete
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
    
  )
}
