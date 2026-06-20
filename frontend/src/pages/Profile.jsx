import { useEffect, useState } from "react";
import api from "../services/api";
import AppLayout from "../components/AppLayout";
import Loader from "../components/Loader";
import "../styles/profile.css";

function Profile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/employees/profile");
  console.log(res.data);

setEmployee(res.data.employee);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <Loader />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="profile-page">
        <div className="profile-card">

          <div className="profile-avatar">
            {employee.fullName.charAt(0).toUpperCase()}
          </div>

          <h2>{employee.fullName}</h2>
          <p>{employee.designation}</p>

          <div className="profile-info">
            <div>
              <strong>Employee ID</strong>
              <span>{employee.employeeId}</span>
            </div>

            <div>
              <strong>Email</strong>
              <span>{employee.email}</span>
            </div>

            <div>
              <strong>Department</strong>
              <span>{employee.department}</span>
            </div>

            <div>
              <strong>Role</strong>
              <span>{employee.role}</span>
            </div>
          </div>

        </div>
      </div>
    </AppLayout>
  );
}

export default Profile;