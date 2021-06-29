import { calculoLetrasReferenciaCatastral } from '../validators/ValidateRefCat'

export default function LocationToRefCat(inputObject) {
  let refCat = ''
  console.log(inputObject)
  const { province, town, polygon, parcel } = inputObject
  refCat += province.toString().padStart(2, '0')
  refCat += town.toString().padStart(3, '0')
  refCat += 'A'
  refCat += polygon.toString().padStart(3, '0')
  refCat += parcel.toString().padStart(5, '0')
  refCat += '0000'
  refCat += calculoLetrasReferenciaCatastral(refCat)
  return refCat
}
