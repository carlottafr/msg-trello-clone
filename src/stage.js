export default function setStage(num) {
    let stage;
    if (num == 1) {
        stage = "Initiation";
    } else if (num == 2) {
        stage = "In progress";
    } else if (num == 3) {
        stage = "Testing";
    } else if (num == 4) {
        stage = "Implementation";
    } else if (num == 5) {
        stage = "Maintenance";
    } else {
        stage = "Closed";
    }
    return stage;
}

// helper function for board.js & ticket.js
