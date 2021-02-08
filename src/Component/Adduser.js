import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
export default function Adduser() {
	const history = useHistory();
	const { id } = useParams();

	const intialUserValues = {
		firstname: '',
		lastname: '',
		mobile: '',
		hobies: [{ id: +1, hobit: '' }],
	};
	const [userValues, setUserValues] = useState(intialUserValues);

	const handleInputChange = (e) => {
		setUserValues({ ...userValues, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:3000/posts', userValues);
		history.push('/');
		console.log(userValues, '=userInfo==');
	};

	//EditUserData
	const updateUserData = async (e) => {
		e.preventDefault();
		await axios.put(`http://localhost:3000/posts/${id}`, userValues);
		history.push('/');
	};
	const editUserData = async () => {
		let userEditData = await axios.get(`http://localhost:3000/posts/${id}`);
		setUserValues(userEditData.data);
		console.log(userEditData);
	};
	useEffect(() => {
		editUserData();
	}, []);
	//EditUserEnd
	const handleHobitChange = (e, id) => {
		let hobitValue = userValues.hobies.map((item) => {
			if (item.id == id) {
				item.hobit = e.target.value;
				return item;
			} else {
				return item;
			}
		});
		setUserValues({ ...userValues, hobies: hobitValue });
	};
	const addNewFileds = (e) => {
		e.preventDefault();
		let addFiledData = userValues.hobies[userValues.hobies.length - 1];
		if (addFiledData.hobit.length > 0) {
			let data = userValues.hobies;
			data.push({ id: addFiledData.id + 1, hobit: '' });
			setUserValues({ ...userValues, hobies: data });
		}
	};
	const removeFileds = (e) => {
		e.preventDefault();
		let removeData = userValues.hobies;
		let length = userValues.hobies.length;
		let data = removeData.filter((x, index) => {
			if (index !== length - 2) {
				return x;
			}
		});
		setUserValues({ ...userValues, hobies: data });
	};

	return (
		<>
			<div className="col-md-6">
				<form onSubmit={handleFormSubmit}>
					<div className="form-group">
						<label>FirstName</label>
						<input
							type="text"
							className="form-control"
							name="firstname"
							onChange={handleInputChange}
							value={userValues.firstname}
						/>
					</div>
					<div className="form-group">
						<label>LastName</label>
						<input
							type="text"
							className="form-control"
							name="lastname"
							value={userValues.lastname}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						<label>Mobile</label>
						<input
							type="text"
							className="form-control"
							name="mobile"
							value={userValues.mobile}
							onChange={handleInputChange}
						/>
					</div>
					<div className="form-group">
						{userValues.hobies.map((data, i) => {
							return (
								<div key={i}>
									<label>Hobit</label>
									<input
										type="text"
										value={data.hobit}
										className="form-control"
										onChange={(e) => handleHobitChange(e, data.id)}
									/>
								</div>
							);
						})}
					</div>
					{!id ? (
						<div style={{ display: 'flex' }}>
							<button className="btn btn-info mx-2" onClick={addNewFileds}>
								+
							</button>

							<button className="btn btn-danger" onClick={removeFileds}>
								-
							</button>
						</div>
					) : null}

					<div>
						{!id ? (
							<button className="btn btn-primary">Submit</button>
						) : (
							<button className="btn btn-info" onClick={updateUserData}>
								Update
							</button>
						)}
					</div>
				</form>
			</div>
		</>
	);
}
