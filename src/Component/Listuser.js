import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
export default function Home() {
	let history = useHistory();
	const [userData, setUserData] = useState([]);
	const [searchValue, setSearchValue] = useState({
		searchName: '',
	});
	// const [errorMessage, setErrorMessage] = useState('');
	// console.log(errorMessage, '===asdfa==');
	// console.log(userData);
	const loadData = async () => {
		let dataList = await axios.get('http://localhost:3000/posts');
		setUserData(dataList.data);
		// console.log(dataList.data.hobies[0]);
	};
	useEffect(() => {
		loadData();
	}, []);

	const editUserData = (list) => {
		history.push(`adduser/${list.id}`);
	};
	const deleteUserData = async (id) => {
		console.log(id);
		await axios.delete(`http://localhost:3000/posts/${id}`);
		loadData();
	};
	const searchRespValue = (e) => {
		let searchData = e.target.value;
		let filterdata = [];

		if (searchData.length > 0) {
			userData.filter((item) => {
				if (item.firstname.toLowerCase().includes(searchData)) {
					filterdata.push(item);
				}
			});
		} else {
			loadData();
		}
		setSearchValue({ ...searchValue, [e.target.name]: e.target.value });
		setUserData(filterdata);
	};
	return (
		<div>
			<h6 className="text-center my-5">UserList</h6>
			<input
				type="text"
				onChange={searchRespValue}
				placeholder="SearchName"
				name="searchName"
			/>
			<table className="table table-border">
				<thead>
					<tr>
						<th>FirstName</th>
						<th>LastName</th>
						<th>MobileNo</th>
						<th>Hobies</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{userData.map((data, id) => {
						return (
							<tr key={id}>
								<td>{data.firstname}</td>
								<td>{data.lastname}</td>
								<td>{data.mobile}</td>
								{data.hobies.map((re) => {
									return <td>{re.hobit}</td>;
								})}
								<td>
									<button
										className="btn btn-secondary mx-2"
										onClick={() => editUserData(data)}
									>
										Edit
									</button>
									<button
										className="btn btn-danger"
										onClick={() => deleteUserData(data.id)}
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			{/* <h3>{errorMessage}</h3> */}
		</div>
	);
}
