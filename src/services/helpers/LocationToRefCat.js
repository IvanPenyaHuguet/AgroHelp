import { calculoLetrasReferenciaCatastral } from '../validators/ValidateRefCat'

export default function RefCatToLocation(inputObject) {
  let refCat = ''

  refcat
  const objToReturn = {
    province: parseInt(refCat.substr(0, 2)),
    town: parseInt(refCat.substr(2, 3)),
    polygon: parseInt(refCat.substr(6, 3)),
    parcel: parseInt(refCat.substr(9, 5)),
  }

  return refCat
}
