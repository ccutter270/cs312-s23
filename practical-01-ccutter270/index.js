
/*
NAME: Caroline Cutter
DATE: Feb 16, 2023
CSCI 312 Spring 2023
PRACTICAL 1   
*/



// WRITING SOME FUNCTIONS 



// Summation 1 - using a for loop
export const summationFor = (list) => {

    let total = 0;
    
    for (let i = 0; i < list.length; i++) {
        total += list[i]
      }
    
    //console.log(total);
    return total; 

    };


// Summation 2 - using a forEach loop

export const summationForEach = (list) => {

    let total = 0;

    list.forEach((i)=> {
        total += i
    })
    
    //console.log(total);
    return total; 

    };


// Summation 3 - using reduce 

export const summationReduce = (list) => {

    
    let total = list.reduce((total, i) => total + i, 0);
    
    //console.log(total);
    return total; 

    };


// Decorate Function - using map 

export const decorate = (list) => {

    return list.map(val => `-<< ${val} >>-`)


};





    