function parsecsToLightYears (parsecs: string): string {
  return (parseFloat(parsecs) * 3.26156378).toFixed(2)
}

export {
  parsecsToLightYears
}
