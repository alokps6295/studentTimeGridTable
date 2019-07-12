const rules = {
    carId: 'required|string|min:5|max:5',
    name: 'required|string|min:4|max:20',
    price: 'required|number',
    yearOfManuf: 'required|number|min:4|max:4'
}

export default rules;