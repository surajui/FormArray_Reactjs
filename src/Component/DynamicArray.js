import React, { useState, useEffect } from 'react';

export const DynamicFormArray = () => {
	const intailFiled = {
		firstName: '',
		lastName: '',
		hobbies: [{ id: +1, hobbieOne: '' }],
	};
	const [inputFileds, setInputFiled] = useState(intailFiled);

	const setInputChange = (e) => {
		// const [name, value] = e.target;
		setInputFiled({ ...inputFileds, [e.target.name]: e.target.value });
	};
	const hangleSubmit = (e) => {
		e.preventDefault();
		console.log(inputFileds);
	};
	const addFileds = (e) => {
		let lastData = inputFileds.hobbies[inputFileds.hobbies.length - 1];
		if (lastData.hobbieOne.length > 0) {
			let y = inputFileds.hobbies;
			y.push({ id: lastData.id + 1, hobbieOne: '' });
			setInputFiled({ ...inputFileds, hobbies: y });
		}
	};
	const addFiledValue = (e, id) => {
		let arry = inputFileds.hobbies.map((x) => {
			if (x.id == id) {
				x.hobbieOne = e.target.value;
				return x;
			} else {
				return x;
			}
		});
		setInputFiled({ ...inputFileds, hobbies: arry });
	};
	const removeFileds = (data) => {
		console.log(data, '===id===');
		const values = [...inputFileds.hobbies];
		console.log(values, '===values===');
		let result = values.filter((item) => item.id !== data);
		// values.splice(id, 1);
		setInputFiled(result);
	};

	return (
		<>
			<h2>DynamicFormArray</h2>
			<form onSubmit={hangleSubmit}>
				<div className="form-group">
					<input
						type="text"
						name="firstName"
						placeholder="firstName"
						onChange={setInputChange}
						className="form-control"
						value={inputFileds.firstName}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						onChange={setInputChange}
						className="form-control"
						name="lastName"
						placeholder="lastName"
						value={inputFileds.lastName}
					/>
				</div>
				<div className="form-group">
					{inputFileds.hobbies &&
						inputFileds.hobbies.map((data, i) => {
							return (
								<div key={i}>
									<input
										type="text"
										onChange={(e) => addFiledValue(e, data.id)}
										name="hobbies"
										placeholder="hobbies"
										className="form-control"
										value={data.hobbieOne}
									/>
									<div className="form-group">
										{inputFileds.hobbies.length > 0 ? (
											<button onClick={addFileds}>+</button>
										) : (
											<button onClick={(e) => removeFileds(data)}>-</button>
										)}
									</div>
								</div>
							);
						})}
				</div>
				<div>
					<input type="submit" value="submit" />
				</div>
			</form>
		</>
	);
};
