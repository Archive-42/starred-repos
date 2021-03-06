function polygonPerimeter(matrix) {
  let out = 0,
    leny = matrix.length,
    lenx = matrix[0].length;

  for (let y = 0; y < leny; y++) {
    for (let x = 0; x < lenx; x++) {
      if (matrix[y][x]) {
        if (y + 1 == leny || !matrix[y + 1][x]) {
          out++;
        }
        if (y - 1 < 0 || !matrix[y - 1][x]) {
          out++;
        }
        if (x + 1 == lenx || !matrix[y][x + 1]) {
          out++;
        }
        if (x - 1 < 0 || !matrix[y][x - 1]) {
          out++;
        }
      }
    }
  }

  return out;
}
