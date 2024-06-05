import AddForm from "../widgets/AddForm.jsx";
import AddScans from "../widgets/AddScans.jsx";
import {Divider} from "antd";
import ThemeToggle from "../shared/SwitchTheme.jsx";


function App() {
    // const renderList = useMemo(() => {
    //     return data.map((item) => (
    //         <li style={{
    //             color: "white"
    //         }} key={item.id}>{item.name}</li>
    //     ))
    // }, [data, setData])

    return (
        <>
            <ThemeToggle/>
            <AddForm/>
            <Divider  style={{
                backgroundColor: "#000000"
            }}/>
            <AddScans/>
       </>
    );
}

export default App;