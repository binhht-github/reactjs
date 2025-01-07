import { useEffect, useState } from 'react';
import { google } from 'googleapis';
import axios from 'axios';

const ReadGoogleSheet = () => {
    const [data, setData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const auth = new google.auth.OAuth2(
                    "YOUR_CLIENT_ID",//'',
                    "YOUR_CLIENT_SECRET",//'',
                    "YOUR_REDIRECT_URI",//''
                );

                // Thiết lập quyền truy cập
                const sheets = google.sheets({ version: 'v4', auth });
                const response = await sheets.spreadsheets.values.get({
                    spreadsheetId: 'YOUR_SPREADSHEET_ID', //'',
                    range: 'Sheet2!A1:C10', // Đặt phạm vi của dữ liệu
                });

                setData(response.data.values as any);
            } catch (error) {
                console.error("Error reading data from Google Sheets:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Google Sheets Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Column 1</th>
                        <th>Column 2</th>
                        <th>Column 3</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>{row[2]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReadGoogleSheet;

