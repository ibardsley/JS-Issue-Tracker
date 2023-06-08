document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

/*function to handle the data entered into the form, store the 
information into local storage and then push the issue into the card
format */
function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';

    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
}

//change the status of the issue to closed when the close button is pressed within the card
function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}
//function to delete issues when the delete button is pressed within the card
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));

    for (var i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

// Get issues from local storage and post them in html format using bootstrap cards
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="card text-center bg-light">'+
                                '<div class="card-header text-dark bg-info">Issue ID: ' + id + '</div>'+
                                '<div class="card-body bg-light">' +
                                '<p><span class="label label-info"> Status: ' + status + '</span></p>'+
                                '<h3> Issue: ' + desc + '</h3>'+
                                '<p> Priority: ' + severity + '</p>'+
                                '<p> Assigned To: ' + assignedTo + '</p>'+
                                '<a href="#" onClick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                                '<a href="#" onClick="deleteIssue((\''+id+'\'))" class="btn btn-danger">Delete</a>'+
                                '</div>';
                                '</div>';
    }
}