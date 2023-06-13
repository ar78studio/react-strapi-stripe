const VerifyAxios = () => {
    ...
    const [selectedCountry, setSelectedCountry] = useState('ES');
    ...
    return (
        <div>
            ...
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlePhoneNumberSubmit}>
                {/* Here, Formik passes an object which includes setFieldValue */}
                {(formikProps) => {
                    const { isSubmitting, setFieldValue } = formikProps;
                    return (
                        <Form id='phoneNumberForm' className='block flex flex-col max-w-full gap-4 '>
                            ...
                            <div className='flex flex-col'>
                                <label className='text-buttonColor' htmlFor='countryCode'>
                                    Country Code:
                                </label>
                                <select
                                    className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2'
                                    name='countryCode'
                                    value={selectedCountry}
                                    onChange={(e) => {
                                        setSelectedCountry(e.target.value);
                                        setFieldValue('countryCode', countryCodes[e.target.value]);
                                    }}
                                >
                                    <option value='US'>US (+1)</option>
                                    <option value='GB'>GB (+44)</option>
                                    <option value='ES'>ES (+34)</option>
                                </select>
                            </div>
                            ...
                        </Form>
                    );
                }}
            </Formik>
            ...
        </div>
    );
};
