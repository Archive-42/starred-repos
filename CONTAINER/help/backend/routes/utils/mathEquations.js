function distance(user, lat1, lon1, lat2, lon2) {
	if ((lat1 === lat2) && (lon1 === lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		
		user.dataValues.distance = dist;
    
		return user;
	}
}

function quickSort(array) {
	if (array.length <= 1) {
		return array;
	}

	let pivot = array.shift();
	let left = array.filter((el) => el.user.dataValues.distance < pivot.user.dataValues.distance);
	let right = array.filter((el) => el.user.dataValues.distance >= pivot.user.dataValues.distance);

	let leftSorted = quickSort(left);
	let rightSorted = quickSort(right);

	return [ ...leftSorted, pivot, ...rightSorted ];
}

module.exports = { distance, quickSort };