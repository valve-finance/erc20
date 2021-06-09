import { BigDecimal, log } from '@graphprotocol/graph-ts'
import { Asset, User, } from '../types/schema'
import { createAsset } from './assets'
import {
  Transfer
} from '../types/ERC20/Token'

import {
  createUser,
  updateUserStats,
  exponentToBigDecimal
} from './helpers'

export function handleTransfer(event: Transfer): void {
  // this is the address specified in the subgraph.yaml file
  let assetID = event.address.toHexString()
  let asset = Asset.load(assetID)
  if (asset == null) {
    asset = createAsset(assetID)
    asset.save()
  }
  let AssetDecimals = asset.decimals
  let AssetDecimalsBD: BigDecimal = exponentToBigDecimal(AssetDecimals)
  let userFromID = event.params.from.toHex()
  if (userFromID != assetID) {
    let UserStatsFrom = User.load(userFromID)
    if (UserStatsFrom == null) {
      UserStatsFrom = createUser(userFromID)
    }
    else {
      UserStatsFrom = updateUserStats(userFromID)
    }
    UserStatsFrom.balance = UserStatsFrom.balance.minus(
      event.params.value
        .toBigDecimal()
        .div(AssetDecimalsBD)
        .truncate(AssetDecimals),
    )
    UserStatsFrom.save()
  }
  let userToID = event.params.to.toHex()
  if (userToID != assetID) {
    let UserStatsTo = User.load(userToID)
    if (UserStatsTo == null) {
      UserStatsTo = createUser(userToID)
    }
    else {
      UserStatsTo = updateUserStats(userToID)
    }
    UserStatsTo.balance = UserStatsTo.balance.plus(
      event.params.value
        .toBigDecimal()
        .div(AssetDecimalsBD)
        .truncate(AssetDecimals),
    )
    UserStatsTo.save()
  }
}