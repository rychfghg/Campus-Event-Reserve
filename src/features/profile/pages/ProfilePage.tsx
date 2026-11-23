import { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/profile.css";

type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  profileImage: string;
};
const API_URL = process.env.REACT_APP_API_URL;
const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    profileImage: "",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (!savedUser?.id) return;

    axios
      .get(`${API_URL}/api/profile/${savedUser.id}`)
      .then((res) => {
        const profile = res.data;

        setUser(profile);
        setForm({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          studentId: profile.studentId || "",
        });
        setImagePreview(profile.profileImage || "");
      })
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const profileRes = await axios.put(
        `${API_URL}/api/profile/${user.id}`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          studentId: form.studentId,
        }
      );

      let updatedUser = profileRes.data;

      if (imagePreview !== user.profileImage) {
        const photoRes = await axios.put(
          `${API_URL}/api/profile/${user.id}/photo`,
          {
            profileImage: imagePreview,
          }
        );

        updatedUser = photoRes.data;
      }

      setUser(updatedUser);
      setForm({
        firstName: updatedUser.firstName || "",
        lastName: updatedUser.lastName || "",
        studentId: updatedUser.studentId || "",
      });
      setImagePreview(updatedUser.profileImage || "");

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      alert(err?.response?.data || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      studentId: user.studentId || "",
    });
    setImagePreview(user.profileImage || "");
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">
            Manage your personal information.
          </p>
        </div>
      </div>

      <div className="profile-layout">
        <aside className="profile-side ui-card">
          <div className="profile-image">
            {imagePreview ? (
              <img src={imagePreview} alt="profile" />
            ) : (
              <span>{form.firstName?.charAt(0)?.toUpperCase() || "U"}</span>
            )}
          </div>

          <div className="profile-name">
            {`${form.firstName} ${form.lastName}`.trim() || "Student"}
          </div>
          <div className="profile-sub">
            Student{form.studentId ? ` · ${form.studentId}` : ""}
          </div>

          <label className="secondary-btn btn-sm upload-btn">
            Change photo
            <input type="file" accept="image/*" onChange={handleImage} hidden />
          </label>
        </aside>

        <section className="profile-form ui-card">
          <h3 className="form-card-title">Personal information</h3>

          <div className="field-row">
            <div className="field">
              <label>First name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label>Last name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>Student ID</label>
              <input
                name="studentId"
                value={form.studentId}
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input value={user.email || ""} readOnly />
            </div>
          </div>

          <div className="field">
            <label>Account ID</label>
            <input value={user.id || ""} readOnly />
          </div>

          <div className="button-row">
            <button
              className="secondary-btn"
              type="button"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="primary-btn"
              type="button"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
