# indiaPinCodes
Get Indian address details from indian Postal pin codes. Built on Node js.

### Usage
Send a request to the following url 

```
https://indianpostalcodes.herokuapp.com/pincode/\<a_6_digit_indian_pincode>
```

To get the details of a particular picode in India. 

**Warning**: The database is imported from several free resources, hence can contain some severe errors i.e., pincode and address may not match.


If you request from a proper path then you'll get the following error.

``` JSON
{"Response":"False","Error":"No such postal code in database"}
```

So please make sure you request from a right URL.

You will get the following error if no such pincode exists.

``` JSON
{"Response":"False","Error":"No such postal code in database"}
```

It means no such pincode exists in the database. Not necessarily does it mean there is no such pincode at all, but our database doesn't hold it's data.

### Code Examples:

**In case of PHP**:
 
``` php
$response = file_get_contents('https://indianpostalcodes.herokuapp.com/pincode/110008');
$response = json_decode($response);

```

Gets you the address data of Delhi, since this pincode belongs to Delhi.

<br />
<br />
Cheers,
<br />
Rj