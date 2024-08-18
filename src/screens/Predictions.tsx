import Prediction from "../components/Prediction";
import { PredictionData } from "../types";

interface PredictionsProps {
  stopId: string | number;
  data: PredictionData[];
}

function Predictions(props: PredictionsProps) {
  const { stopId, data } = props;

  return (
    <div>
      {/* Stop ID */}
      <div className="absolute top-0 right-[2px] text-[#D3D3D3] text-[20px] tracking-[-1%]">
        {stopId}
      </div>

      {data.map((prediction) => (
        <Prediction
          key={`${prediction.routeNumber},${prediction.direction}`}
          routeType={prediction.routeType}
          routeNumber={prediction.routeNumber}
          direction={prediction.direction}
          timeAndCrowdedness={prediction.timeAndCrowdedness}
        />
      ))}
    </div>
  );
}

export default Predictions;
