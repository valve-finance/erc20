import { BigDecimal } from '@graphprotocol/graph-ts'
import { User } from '../types/schema'

export function exponentToBigDecimal(decimals: i32): BigDecimal {
  let bd = BigDecimal.fromString('1')
  for (let i = 0; i < decimals; i++) {
    bd = bd.times(BigDecimal.fromString('10'))
  }
  return bd
}

export let zeroBD = BigDecimal.fromString('0')

export function createUser(
  userId: string
): User {
  let UserStats = new User(userId)
  UserStats.balance = zeroBD
  UserStats.save()
  return UserStats as User
}

export function updateUserStats(
  userId: string
): User {
  let UserStats = User.load(userId)
  if (UserStats == null) {
    UserStats = createUser(userId)
  }
  return UserStats as User
}