export default interface IMainPreload {
  cancelInitialChangesRestore(): Promise<void>
  restoreInitialChanges(): Promise<void>
}
