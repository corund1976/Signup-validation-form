const unixToDateConvert = (date) => {
  if (date) {
    const newDate = new Date(Number(date))
    const formattedDate = newDate.toISOString().slice(0, 10)
    return formattedDate
  }
  return null
}

export default unixToDateConvert

// 1661154311000 => 2022-08-20