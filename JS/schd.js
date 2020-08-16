$(document).ready(function () {
    calendarObj.makeCalendar()
    //load stored notes   //use this sort of pattern let storedPlans = JSON.parse(localStorage.getItem("storedPlans")); run an if state ment to check 
    
    //save click event - saves a day note.
    $(".sveBtn").on("click", function () {

        console.log("pressed a button");
        var slotNum = $(this).attr("slot"); //this get the slot# 
        var getNoteID = $("#idNote-" + slotNum); //this constructs the id of the input element.    
        aStrSet = Object.create(storeSet);
        aStrSet.number = slotNum;
        aStrSet.text = getNoteID.val();
        storeArray.push(aStrSet);
        localStorage.setItem("dayNotes", JSON.stringify(storeArray));

    });

    var storeSet ={
        slot: 'number',
        note: 'text'
    }
    //load data from local storage code.
    var storeArray = [];
    let dayNts = JSON.parse(localStorage.getItem("dayNotes"));
    if (dayNts !== null) {
        storeArray = dayNts;
    } else {
        console("dayNts is coming up as null")
        storeArray = [];
    }

    for (i = 0; i < storeArray.length; i++) {
        console.log(storeArray[i].text);
        let num = storeArray[i].number;
        $("#idNote-" + num).val(storeArray[i].text);
    }
    
});


//created an obj literal as per the jQuery intro documentation for best practice.
let calendarObj = {
    date: 'dateValueHolder',
    currentHour: moment().hour(),

    makeCalendar: function () {
        $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
        for (let i = 9; i <= 17; i++) {
            calendarObj.createTimeSlot(i);
        }
    },

    createTimeSlot: function (num) {
        let adjTme;
        //make the grid using jquery     
        //if, else if else for number assignment and converting military time to civilian time.
        if(num> 12) 
        { adjTme = num -12;
           var divTime = $("<button>" + adjTme + " PM" + "</button>");
        }else if(num === 12){ var divTime = $("<button>" + num + " PM" + "</button>");}
        else{var divTime = $("<button>" + num + " PM" + "</button>");}
        divTime.addClass("btn btn-outline-primary m-0 col-2")
        divTime.attr("id", "idTime" + num);
    
        var divNote = $("<input>");
        divNote.attr("id", "idNote-" +num);
       // divNote.attr("noteSlot", num);          //here we create a note slot for save and recall
        divNote.addClass(num + this.setSlotState(num));

        var divSave = $("<button>");
        divSave.addClass("sveBtn btn btn-outline-success m-0 col-2");
        divSave.attr("id", "idSave"+num);
        divSave.attr("slot", num);              //here we create a slot for save and recall
        var saveIcon = $("<i>");
        saveIcon.addClass("far fa-save"); //font awesome icon.
        divSave.append(saveIcon);

        var row = $("<div>");
        row.addClass("row bg-light");
        $(row).append(divTime);
        $(row).append(divNote);
        $(row).append(divSave);

        var divContainer = $(".container");
        divContainer.append(row);

    },

    setSlotState:function(num){
        var inState ="";
        if(num> this.currentHour)
        {
            inState = "input m-0 col-8 bg-primary";;
            return inState;                                      ////  //num is in the future
        }else if(num === this.currentHour){
            inState = "input m-0 col-8 bg-danger";
            return inState;                                      //num is in present hour
        }else{
            inState = "input m-0 col-8 bg-secondary";
            return inState;                                    //num is in the past
        }                                   
    },
};

// localStorage.setItem("ScoreBoard", JSON.stringify(scoreArray));
// localStorage.setItem("ScoreBoard", JSON.stringify(scoreArray));

