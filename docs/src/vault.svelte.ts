let value = $state(false)
export const vault = {
  get showVault() {
    return value
  },
  set showVault(bool: boolean) {
    value = bool
  }
}
