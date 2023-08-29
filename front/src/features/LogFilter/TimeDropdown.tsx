import { useNavigation } from "@/hooks/useNavigation";
import { Dropdown } from "../../components/molecules/Dropdown";

export const TimeDropdown = () => {
    const { searchParams, updateSearchParam } = useNavigation();
    const timeOptions = ["Last hour", "Last day", "Last week"];
    const selectedTime = searchParams.get("dateTimeFilter") || "Last hour";
    const onTimeSelect = (newValue: string) => {
        updateSearchParam("dateTimeFilter", newValue);
    };
    return (
        <Dropdown
            options={timeOptions}
            selected={selectedTime}
            onSelect={onTimeSelect}
        />
    );
};
