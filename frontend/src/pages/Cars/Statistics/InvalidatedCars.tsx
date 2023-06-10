import { Typography } from "@material-tailwind/react";
import { Period } from "../../../components/models/Period";
import { CarModelChart } from './CarModelChart';
import { DataProvider } from "./RegisteredCars";
import Statistics from "./RegisteredCharts";

export default function InvalidatedCarsStatisticsPage() {
    return (
        <div className="flex flex-col justify-between items-center w-full">
            <Typography variant="h2">
                Danh sách xe hết hạn đăng kiểm
            </Typography>
            <DataProvider >
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="w-3/4">
                        <Statistics type={Period.Month} K={"invalidate_date"} />
                    </div>
                    <div className="w-3/4">
                        <Statistics type={Period.Quarter} K={"invalidate_date"} />
                    </div>
                    <div className="w-3/4">
                        <Statistics type={Period.Year} K={"invalidate_date"} />
                    </div>
                </div>
                <div className="flex justify-center items-center w-11/12 mt-10">
                    <div className="w-1/2">
                        <CarModelChart
                            T={"manufacturer"}
                            title="Thị phần các nhà sản xuất"
                            minPercent={0.04} />
                    </div>
                    <div className="w-1/2">
                        <CarModelChart
                            T={"carbody"}
                            title="Mẫu xe thịnh hành trên thị trường"
                        />
                    </div>
                </div>
            </DataProvider>
        </div >
    )
}