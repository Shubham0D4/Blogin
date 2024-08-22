# Blogin
Blogin is a Website for blog writers to write their blogs online and saving them as a memory and refrences to future.

<h3>To initialise the project on localhost you need to follow these steps:</h3>

<h4>Step 1:</h4>
<h6>In terminal, Navigate to parent folder of this project. More specifically Blogin</h6>

<h4>Step 2:</h4>
<h6>Run the command: `npm install`</h6>

<h4>Step 3:</h4>
<h6>Run the command: `nodemon server.js`</h6>

<h4>Step 4:</h4>
<h6>Navigate to browser and search: `localhost:PORT`</h6>
`Replace PORT with 8080 or port shown on terminal`

<h3>Things to be Aware of before hosting it on localhost:</h3>

<h5>As this website is using mysql for databases, you should have mysql server on your system.</h5>

<h5>In `Database` folder, in this Blogin folder, in `dbhost.js` file replace password with your user password for database.</h5>

<h5>Follow these instructions after opening mysql shell client</h5>

<h6>1. Create database named `Blogin`.</h6>
<h6>2. Create tables: user, writtenArticle</h6>

<h5>Details of tables:</h5>

<h6>User:</h6>
<table border="1" cellspacing="0" cellpadding="5">
    <thead>
        <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Null</th>
            <th>Key</th>
            <th>Default</th>
            <th>Extra</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>id</td>
            <td>varchar(10)</td>
            <td>NO</td>
            <td>PRI</td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>firstName</td>
            <td>varchar(40)</td>
            <td>NO</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>midName</td>
            <td>varchar(40)</td>
            <td>NO</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>lastName</td>
            <td>varchar(40)</td>
            <td>NO</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>mail</td>
            <td>varchar(100)</td>
            <td>NO</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>password</td>
            <td>varchar(255)</td>
            <td>NO</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
    </tbody>
</table>


<h6>writtenArticle</h6>
<table border="1" cellspacing="0" cellpadding="5">
    <thead>
        <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Null</th>
            <th>Key</th>
            <th>Default</th>
            <th>Extra</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>userid</td>
            <td>varchar(10)</td>
            <td>YES</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>articleId</td>
            <td>varchar(10)</td>
            <td>NO</td>
            <td>PRI</td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>title</td>
            <td>varchar(50)</td>
            <td>NO</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>summary</td>
            <td>text</td>
            <td>YES</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>main_text</td>
            <td>text</td>
            <td>YES</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
        <tr>
            <td>ispublic</td>
            <td>int</td>
            <td>YES</td>
            <td></td>
            <td>NULL</td>
            <td></td>
        </tr>
    </tbody>
</table>






















