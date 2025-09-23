const starColors: { [key: string]: string } = {
  'O': '#9bb0ff',
  'B': '#aabfff',
  'A': '#cad7ff',
  'F': '#f8f7ff',
  'G': '#fff4ea',
  'K': '#ffd2a1',
  'M': '#ffcc6f',
  // 'L': '#ff9966', Not used
  'T': '#cc6699',
  'Y': '#666666'
}

function getStarColor(spectralType: string): string {
  return starColors[spectralType] ?? '#ffffff'
}

export {
  getStarColor
}
