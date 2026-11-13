console.log(JSON.stringify((await listTaskSpaces()).filter(x=>[2,3,4].includes(x.id))));
