const validationSchema = Yup.object({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
});

const MyForm = () => (
	<Formik
		initialValues={{
			name: '',
			email: '',
		}}
		validationSchema={validationSchema}
		onSubmit={(values) => {
			// Save form values to a global variable
			window.myGlobalVariable = values;
		}}
	>
		{(formik) => (
			<Form>
				<div>
					<label htmlFor='name'>Name:</label>
					<Field type='text' id='name' name='name' />
					{formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
				</div>

				<div>
					<label htmlFor='email'>Email:</label>
					<Field type='email' id='email' name='email' />
					{formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
				</div>

				<button type='submit'>Submit</button>
			</Form>
		)}
	</Formik>
);
