tableMain = document.getElementById("tableBody")
fetch("Resources/leaderboard.txt")
    .then(response => response.text())
    .then(data => {
        let leaderboard = data;
        let listOfLists = (leaderboard.split(/\},\s*/g).map(s => s.replace(/[{}]/g, '').split(/\s*,\s*/g)));
        listOfLists.pop()
        listOfLists.sort((a, b) => b[0] - a[0]);
        console.log(listOfLists)
        listOfLists.forEach(list => {
            const row = document.createElement('tr');
            list.forEach(item => {
                const cell = document.createElement('td');
                cell.textContent = item;
                row.appendChild(cell);
            });
            tableMain.appendChild(row);
        });
    })
