// [front, right, back, left, top, bottom]

cubes = [
  ["W", "R", "G", "R", "R", "B"],
  ["B", "R", "W", "W", "R", "G"],
  ["G", "B", "W", "W", "B", "R"],
  ["R", "B", "G", "B", "G", "W"]
]

check([], cubes);

function check(base, rest) {
  currentCube = rest[0]
  currentCubeConfigurations = generateAllConfigurations(currentCube);

  currentCubeConfigurations.forEach((currentCubeConfiguration) => {
    let compatible = isCompatible(base, currentCubeConfiguration);
    if (!compatible) return;

    let newBase = base.slice();
    newBase.push(currentCubeConfiguration);

    if (newBase.length == 4) {
      console.log('Configuration found');
      console.log(newBase);
      throw new Error("Winner");
    }

    let newRest = rest.slice();
    newRest.splice(0, 1);

    check(newBase, newRest);
  });

}

function generateAllConfigurations(cube) {
  let configs = [];

  for (i = 0; i < 6; i++) {
    let currCube = putSideDown(cube, i);

    for (j = 0; j < 4; j++) {
      let rotatedCurrCube = rollRight(currCube, j);
      configs.push(rotatedCurrCube);
    }
  }

  return configs;
}

function isCompatible(stack, cube) {
  for (i = 0; i < 4; i++) {
    for (j = 0; j < stack.length; j++) {
      if (cube[i] == stack[j][i]) {
        return false;
      }
    }
  }

  return true;
}


function rollRight(cube, times) {
  if (times == 0) return cube;

  lastTwo = cube.slice(cube.length - 2, cube.length);
  firstElements = cube.slice(0, cube.length - 2);

  rotations = times % firstElements.length;
  return firstElements.slice(-rotations).concat(firstElements.slice(0, firstElements.length - rotations)).concat(lastTwo);
}

function putSideDown(cube, side) {
  switch (side) {
    case 0:
      return [cube[4], cube[1], cube[5], cube[3], cube[2], cube[0]];

    case 1:
      return [cube[0], cube[4], cube[2], cube[5], cube[3], cube[1]];

    case 2:
      return [cube[5], cube[1], cube[4], cube[3], cube[0], cube[2]];

    case 3:
      return [cube[0], cube[5], cube[2], cube[4], cube[1], cube[3]];

    case 4:
      return [cube[2], cube[1], cube[0], cube[3], cube[5], cube[4]];

    case 5:
      return cube;

    default:
      throw new Error("Invalid side (must be 0-5)");
  }
}
