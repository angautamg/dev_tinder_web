import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

const defaultProfile = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  gender: "",
  about: "",
  interests: [],
  location: { coordinates: [0, 0] },
  profilePicture: "https://www.nethravidyalaya.org/wp-content/uploads/2018/01/man-dummy.jpg",
};

const genderOptions = ["Male", "Female", "Other"];

const EditProfile = ({ user = defaultProfile, onSave }: any) => {
  const [form, setForm] = useState({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: any) => ({
      ...prev,
      interests: e.target.value.split(",").map((i) => i.trim()),
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const coords = [...form.location.coordinates];
    coords[idx] = Number(e.target.value);
    setForm((prev: any) => ({
      ...prev,
      location: { ...prev.location, coordinates: coords },
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) onSave(form);
    const { firstName,lastName,age,gender,about,interests,location,profilePicture} = form; // Remove updatedAt if present
    const payload={ firstName,lastName,age,gender,about,interests,location,profilePicture};
    const response = await axios.patch(`${API_BASE_URL}user/editprofile`, payload, { withCredentials: true });
  
  };

  return (
    <form
      className="max-w-xl mx-auto bg-base-100 p-8 rounded-2xl shadow-lg flex flex-col gap-6"
      onSubmit={handleSubmit}
    >
      <h2 className="text-3xl font-bold text-center mb-2">Edit Profile</h2>
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="flex flex-col gap-4 flex-1">
          <div className="form-control">
            <label className="label font-semibold">First Name</label>
            <input
              className="input input-bordered"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">Last Name</label>
            <input
              className="input input-bordered"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">Email</label>
            <input
              className="input input-bordered"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">Age</label>
            <input
              className="input input-bordered"
              type="number"
              name="age"
              min={0}
              max={120}
              value={form.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label font-semibold">Gender</label>
            <select
              className="select select-bordered"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              {genderOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="label font-semibold">Profile Picture</label>
          <input
            className="input input-bordered"
            name="profilePicture"
            value={form.profilePicture}
            onChange={handleChange}
          />
          <img
            src={form.profilePicture}
            alt="Profile"
            className="mt-2 w-28 h-28 rounded-full object-cover border-2 border-primary"
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label font-semibold">About</label>
        <textarea
          className="textarea textarea-bordered"
          name="about"
          value={form.about}
          onChange={handleChange}
          rows={3}
        />
      </div>
      <div className="form-control">
        <label className="label font-semibold">Interests (comma separated)</label>
        <input
          className="input input-bordered"
          name="interests"
          value={form.interests.join(", ")}
          onChange={handleInterestsChange}
        />
      </div>
      <div className="form-control">
        <label className="label font-semibold">Location</label>
        <div className="flex gap-2">
          <input
            className="input input-bordered"
            type="number"
            step="any"
            value={form.location.coordinates[0]}
            onChange={(e) => handleLocationChange(e, 0)}
            placeholder="Longitude"
          />
          <input
            className="input input-bordered"
            type="number"
            step="any"
            value={form.location.coordinates[1]}
            onChange={(e) => handleLocationChange(e, 1)}
            placeholder="Latitude"
          />
        </div>
      </div>
      <button className="btn btn-primary w-full mt-4" type="submit">
        Save
      </button>
    </form>
  );
};

export default EditProfile;