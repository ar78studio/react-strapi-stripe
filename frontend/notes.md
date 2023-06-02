1. User Data form
   1.1. Create new lead - GET params from URL - POST params from inputs - COOKIES - Create Lead
   curl --location 'http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/createLead' \
    --header 'Content-Type: application/json' \
    --data-raw '{
   "cusEmail": "anton1.o@riptec.net",
   "cusFirstName": "Anton",
   "cusLastName": "O.",
   "cusSimNumber": "+34684119631",
   "cusCountryISO3": "ESP",
   "getParams": "utm_source=facebook.com&lang=esp",
   "postParams": "email=anton.o@riptec.net;firstname=Anton;",
   "cookies": "all_cookies"
   }'
   1.2. go to 2.

2. Phone number verification
   2.1. If OK go to 3

3. Checkout
   3.1. Fill inputs with data from step 1.
   3.2. If payment failed -> show error
   3.2. If payment OK -> send HTTP request to API
   curl --location 'http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/createUser' \
    --header 'Content-Type: application/json' \
    --data-raw '{
   "cusEmail": "anton1.o@riptec.net",
   "cusFirstName": "Anton",
   "cusLastName": "O.",
   "cusSimNumber": "+34684119631",
   "cusCountryISO3": "ESP",
   "leadId": 123
   }'
