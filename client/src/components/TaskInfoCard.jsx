import React from 'react';
import { cardContent } from '../utils/dashboardCardsContent';
import { useNavigate } from 'react-router-dom';

export const TaskInfoCard = ({ totalTaskCount, highPriorityCount, pendingCount, completedCount }) => {

  console.log(totalTaskCount);
  

  const navigate = useNavigate();
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardContent.map((item, idx) => (
          <div
            key={idx}
            className="
        rounded-2xl
        p-6
        flex flex-col justify-between
        min-h-[180px]
        shadow-lg
        hover:scale-[1.03]
        hover:shadow-xl
        transition-all duration-300
        cursor-pointer
      "
            style={{
              backgroundColor: item.cardBg,
            }}

            onClick={() => navigate("/app/dashboard")}
          >
            {/* Top section */}
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                <img
                  src={item.logo}
                  alt="task icon"
                  className="w-8 h-8 object-contain"
                />
              </div>

              <div>
                <h3
                  className="font-semibold text-sm md:text-base"
                  style={{ color: item.cardNameColor }}
                >
                  {item.cardName}
                </h3>

                {/* <p className="text-white/60 text-xs">
                  
                </p> */}
              </div>
            </div>

            {/* Bottom section */}
            <div className="mt-6">
              <h2 className="font-bold text-4xl md:text-5xl text-white">
                {
                  item.cardName === "Total Tasks"
                    ? totalTaskCount
                    : item.cardName === "Completed"
                      ? completedCount
                      : item.cardName === "Pending"
                        ? pendingCount
                        : highPriorityCount
                }
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
