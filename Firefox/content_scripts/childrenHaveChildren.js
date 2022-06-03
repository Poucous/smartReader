function childrenHaveChildren(parent) { //Unused

    for(var i = 0 ; i < parent.length ; i++) {

        for(var j = 0 ; j < parent[i].children.length ; j++) {

            if(parent[i].children[j].length > 0) {

                return true;
            }
        }     
    }

    return false;
}