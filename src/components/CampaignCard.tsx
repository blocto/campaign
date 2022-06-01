import { Box, Flex, Img, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import Countdown from "./Countdown";
import PrizesLabel from "./PrizesLabel";
import Calendar from "./icons/Calendar";
import bloctoLogo from "../assets/blocto.svg";
import preset from "../assets/preset.jpg";
import { Campaign } from "../types";

interface CampaignCardProps extends Campaign {
  variant?: "regular" | "upcoming" | "ended";
}

const Date = ({ startTime, endTime }: { startTime: any; endTime: any }) => (
  <Flex align="center" bg="#F9F9F9" my={4} borderRadius={8} px={3} py={1}>
    <Calendar size={15} />
    <Flex justify="space-between" ml={2} flex={1}>
      <Text>{startTime.format("YYYY/MM/DD")}</Text>
      {"-"}
      <Text>{endTime.format("YYYY/MM/DD")}</Text>
    </Flex>
  </Flex>
);

const CampaignCard = ({
  id,
  title,
  bannerUrl,
  holder,
  holderLogo,
  prizes,
  variant = "regular",
  startAt,
  endAt,
}: CampaignCardProps) => {
  const bannerStyles =
    variant === "upcoming"
      ? { borderRadius: "12px" }
      : { borderTopRadius: "12px" };
  const startTime = dayjs(startAt * 1000);
  const endTime = dayjs(endAt * 1000);
  return (
    <Link to={`/campaigns/${id}`}>
      <Box
        boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
        borderRadius="12px"
        _hover={{
          opacity: 0.8,
          transform: "scale(0.98)",
        }}
        transition="all .2s"
      >
        <Img src={bannerUrl || preset} width="100%" {...bannerStyles} />
        {variant !== "upcoming" && (
          <Box p={5}>
            <Flex>
              <Box
                boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
                borderRadius="50%"
                width={25}
                height={25}
                p={1}
              >
                <Img src={bloctoLogo} />
              </Box>
              <Text ml={1.5} color="#7f7f7f">
                Blocto
              </Text>
              {holder && holderLogo && (
                <>
                  <Text mx={1} color="#7f7f7f">
                    X
                  </Text>
                  <Box
                    boxShadow="0px 0px 20px rgba(0, 0, 0, 0.05)"
                    borderRadius="50%"
                    width={25}
                    height={25}
                    p={1}
                  >
                    <Img src={holderLogo} />
                  </Box>
                  <Text ml={1.5} color="#7f7f7f">
                    {holder}
                  </Text>
                </>
              )}
            </Flex>
            <Text fontWeight="bold" my={4} whiteSpace="normal" height="6ex">
              {title}
            </Text>
            <PrizesLabel prizes={prizes} active={variant === "regular"} />
            {variant === "regular" ? (
              <Countdown endTime={endTime} my={3} />
            ) : (
              <Date startTime={startTime} endTime={endTime} />
            )}
          </Box>
        )}
      </Box>
    </Link>
  );
};

export default CampaignCard;
