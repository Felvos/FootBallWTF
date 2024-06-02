const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'championship',
    password: '123',
    port: 5432,
});

async function regUser(login, password, repeated_password)
{
    let sql = `INSERT INTO users (login, password, role, favorite_team)
    VALUES ('${login}', '${password}', 'user', NULL);`
    if(password == repeated_password)
    {
        try
        {
            await db.query(sql);
            return true;
        }
        catch (error) 
        {
            console.error("Ошибка: ", error.message);
            throw error;
        }
    }
    else
    {
        return false;
    }
}

async function existUser(login, password)
{
    let sql = `SELECT * FROM users WHERE login = '${login}' AND password = '${password}';`
    try
    {
        const result = await db.query(sql);
        if(result.rows.length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}

async function userInfo(login, password)
{
    let sql = `SELECT * FROM users WHERE login = '${login}' AND password = '${password}';`
    try
    {
        const res = await db.query(sql);
        return res.rows[0];
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}

async function setNewPassword(login, password, newPassword)
{
    let sql = `UPDATE users SET password = '${newPassword}' WHERE login = '${login}' AND password = '${password}';`;
    try
    {
        await db.query(sql);
        return true;
        
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}


async function getAllTeams()
{
    let sql = `SELECT * FROM Teams;`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}
async function getAllTeamsAdmin()
{
    let sql = `SELECT
    Name AS "Название команды",
    Hometown AS "Город",
    team_id AS "id"
FROM
    Teams;
;`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}

async function sendFeedback(fio, mail, message)
{
    let sql = `INSERT INTO feedback (fio, mail, message) VALUES (\'${fio}\', \'${mail}\', \'${message}\');`;
    try
    {
        await db.query(sql);
        return true;
        
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}

async function getAllMatches()
{
    let sql = `SELECT
    ht.Name AS "Команда хозяев",
    m.Score_home AS "Очки хозяев",
    m.Score_guest AS "Очки гостей",
    gt.Name AS "Команда гостей",
    m.Date_of_match AS "Дата матча"
FROM
    Matches m
JOIN
    Teams ht ON m.Home = ht.Team_ID
JOIN
    Teams gt ON m.Guest = gt.Team_ID`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}

async function getAllMatchesAdmin()
{
    let sql = `SELECT
    ht.Name AS "Команда хозяев",
    m.Score_home AS "Очки хозяев",
    m.Score_guest AS "Очки гостей",
    gt.Name AS "Команда гостей",
    m.Date_of_match AS "Дата матча",
    m.match_id AS "id"
FROM
    Matches m
JOIN
    Teams ht ON m.Home = ht.Team_ID
JOIN
    Teams gt ON m.Guest = gt.Team_ID`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}


async function getTournametTable(){
    let sql =`WITH RankedTeams AS (
        SELECT
            ROW_NUMBER() OVER (ORDER BY A.Wins DESC, ((CAST(A.Wins AS FLOAT) / (A.Wins + A.Loses + A.Draws)) * 100) DESC) AS "Место",
            T.Name AS "Название команды",
            A.Wins AS "Победы",
            A.Loses AS "Поражения",
            A.Draws AS "Ничьи",
            TO_CHAR(M.Date_of_match, 'DD.MM.YYYY') AS "Дата последнего матча",
            CAST(((CAST(A.Wins AS FLOAT) / (A.Wins + A.Loses + A.Draws)) * 100) AS INT) || '%' AS "Винрейт"
        FROM
            Teams AS T
        LEFT JOIN
            Analytics AS A ON A.Team = T.Team_ID
        LEFT JOIN
            Matches AS M ON A.Last_match = M.Match_ID
    )
    SELECT * FROM RankedTeams
    ORDER BY "Место";
    `;
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}


//-------------- Ф-ии для аналитики --------------------

async function getAllTrainers()
{
    let sql = `SELECT
    Trainers.FIO AS "ФИО",
    Trainers.Age AS "Возраст",
    Trainers.Experiance_years AS "Стаж (лет)",
    Teams.Name AS "Название команды"
FROM
    Trainers
JOIN
    Analytics ON Trainers.Team = Analytics.Analytics_ID
JOIN
    Teams ON Analytics.Team = Teams.Team_ID;
`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}

async function getAllTrainersAdmin()
{
    let sql = `SELECT
    Trainers.FIO AS "ФИО",
    Trainers.Age AS "Возраст",
    Trainers.Experiance_years AS "Стаж (лет)",
    Teams.Name AS "Название команды",
    Trainers.trainer_id AS "id"
FROM
    Trainers
JOIN
    Analytics ON Trainers.Team = Analytics.Analytics_ID
JOIN
    Teams ON Analytics.Team = Teams.Team_ID;
`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}







async function getAllPlayersOfTeam(team)
{
    let sql = `SELECT
    Players.FIO AS "ФИО",
    Players.Position AS "Позиция"
FROM
    Players
JOIN
    Teams ON Players.Team = Teams.Team_ID
WHERE
    Teams.Name = '${team}';

`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}
async function getAllPlayers()
{
    let sql = `SELECT
    Players.FIO AS "ФИО",
    Teams.Name AS "Команда",
    Players.Position AS "Позиция"
FROM
    Players
JOIN
    Teams ON Players.Team = Teams.Team_ID;

`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}

async function getAllPlayersAdmin()
{
    let sql = `SELECT
    Players.FIO AS "ФИО",
    Teams.Name AS "Команда",
    Players.Position AS "Позиция",
    Players.player_id AS "id"
FROM
    Players
JOIN
    Teams ON Players.Team = Teams.Team_ID;

`
    try
    {
        const res = await db.query(sql);
        return res.rows;
    }
    catch (error) 
    {
        console.error("Ошибка: ", error.message);
        throw error;
    }

}
//--------------------------------------Операции для форм удаления-----------------------------------
async function deleteteams(ids) {
    let loaded_ids = "";
    ids.forEach(id => {
        loaded_ids += id + ", ";
    });
    loaded_ids = loaded_ids.slice(0, -2);
    let sql = `DELETE FROM Teams WHERE Team_ID IN (${loaded_ids});`;
    try {
        await db.query(sql);
    } catch (error) {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}
async function deletetrainers(ids) {
    let loaded_ids = "";
    ids.forEach(id => {
        loaded_ids += id + ", ";
    });
    loaded_ids = loaded_ids.slice(0, -2);
    let sql = `DELETE FROM trainers WHERE trainer_id IN (${loaded_ids});`;
    try {
        await db.query(sql);
    } catch (error) {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}
async function deletematches(ids) {
    let loaded_ids = "";
    ids.forEach(id => {
        loaded_ids += id + ", ";
    });
    loaded_ids = loaded_ids.slice(0, -2);
    let sql = `DELETE FROM matches WHERE match_id IN (${loaded_ids});`;
    try {
        await db.query(sql);
    } catch (error) {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}
async function deleteplayers(ids) {
    let loaded_ids = "";
    ids.forEach(id => {
        loaded_ids += id + ", ";
    });
    loaded_ids = loaded_ids.slice(0, -2);
    let sql = `DELETE FROM players WHERE player_id IN (${loaded_ids});`;
    try {
        await db.query(sql);
    } catch (error) {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}
//--------------------------------------Операции для форм добавления-----------------------------------

async function addteams(name, city) {
    
    let sql = `CALL add_team('${name}', '${city}');`;
    try {
        await db.query(sql);
    } catch (error) {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}
async function addplayers(fio, team, position) {
    
    let sql = `CALL add_player('${fio}', ${team}, '${position}');`;
    try {
        await db.query(sql);
    } catch (error) {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}
async function addmatches(home, score_home, guest, score_guest, date_of_match) {
    
    let sql = `CALL add_match(${home}, ${score_home}, ${guest}, ${score_guest}, '${date_of_match}');`;
    try {
        await db.query(sql);
    } catch (error) {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}
async function addtrainers(fio, age, exp, team) {
    
    let sql = `CALL add_trainer ('${fio}', ${age}, ${exp}, ${team});`;
    try {
        await db.query(sql);
    } catch (error) {
        console.error("Ошибка: ", error.message);
        throw error;
    }
}


module.exports = {
    regUser,
    existUser,
    userInfo,
    sendFeedback,
    getAllMatches,
    getTournametTable,
    setNewPassword,
    getAllTrainers,
    getAllPlayersOfTeam,
    getAllPlayers,
    getAllTeams,
    getAllTeamsAdmin,
    getAllTrainersAdmin,
    getAllMatchesAdmin,
    getAllPlayersAdmin,
    deleteteams,
    deletematches,
    deleteplayers,
    deletetrainers,
    addmatches,
    addplayers,
    addteams,
    addtrainers
};