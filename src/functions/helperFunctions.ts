export function checkForSymbols(firstName : string, lastName : string) : boolean{
	const regex = /^[a-zA-Z0-9-' ]+$/;

	if(firstName.length  <= 15 && lastName.length <= 15){
		return (regex.test(firstName) && regex.test(lastName));
	}

	return false;
}