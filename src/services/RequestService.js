import RefCatToLocation from './helpers/RefCatToLocation'
import { URL } from '../config/URLS'
import * as Database from './database/Database'

export async function GetJSON(url, params) {
  let requestUrl = new window.URL(url)
  Object.keys(params).forEach(key =>
    requestUrl.searchParams.append(key, params[key])
  )
  const response = await fetch(requestUrl, {
    method: 'GET',
  })
  return response.json()
}

export async function PostJSON(url, params) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
  })
  return response.json()
}

export async function GetFieldsAreas(refCat) {
  try {
    const RecintosNoValidos = [
      'PR-PASTO ARBUSTIVO',
      'TA-TIERRAS ARABLES',
      'FO-FORESTAL',
      'CA-VIALES',
      'IM-IMPRODUCTIVOS',
      'TA-TIERRAS ARABLES',
      'ED-EDIFICACIONES',
      'AG-CORRIENTES Y SUPERFICIES DE AGUA',
    ]
    const fieldObject = RefCatToLocation(refCat)
    const params = {
      layer: 'parcela',
      id:
        fieldObject.province +
        ',' +
        fieldObject.town +
        ',0,0,' +
        fieldObject.polygon +
        ',' +
        fieldObject.parcel,
      query: 'montanera',
    }

    let area = await GetJSON(URL.SIGPAC_AREA_TOTAL, params)
    area = parseFloat((area.parcelaInfo.dn_surface / 10000).toFixed(5))
    const plantedAreaData = await GetJSON(URL.SIGPAC_AREA_PLANTADA, params)
    let plantedArea = 0
    plantedAreaData.usos.forEach(uso => {
      if (!RecintosNoValidos.includes(uso.uso_sigpac)) {
        plantedArea += Number(uso.dn_surface)
      }
    })
    plantedArea = parseFloat((plantedArea / 10000).toFixed(5))
    return { area, plantedArea }
  } catch (err) {
    console.error(err)
    const area = 0
    const plantedArea = 0
    return { area, plantedArea }
  }
}

export async function GetReagentData(regNum, treeId) {
  const params = {
    p1: 'mg',
    p2: 'usos',
    p3: '"' + regNum + '"',
  }
  try {
    const results = await GetJSON(URL.CITRUSVOL_AGROVADEMECUM, params)
    const db = await Database.getDatabase()
    const objects = await db.trees
      .findOne({
        selector: {
          _id: treeId,
        },
      })
      .exec()
    const treeName = objects.name.toUpperCase()
    const data = JSON.parse(atob(results.data))
    let dosis = {
      minDose: 0,
      maxDose: 0,
    }
    data.forEach(obj => {
      if (obj.uso.toUpperCase() == treeName) {
        dosis.minDose =
          Number(obj.dosis1) > 100 ? Number(obj.dosis1) / 10000 : obj.dosis1
        dosis.maxDose =
          Number(obj.dosis2) > 100 ? Number(obj.dosis2) / 10000 : obj.dosis2
      }
    })
    return dosis
  } catch (err) {
    console.error(err)
    const area = 0
    const plantedArea = 0
    return { area, plantedArea }
  }
}
