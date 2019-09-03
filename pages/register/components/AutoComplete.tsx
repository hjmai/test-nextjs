import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Input
} from "@material-ui/core";

const LocationSearchInput = props => {
  const handleSelect = address => {
    geocodeByAddress(address).then(results => {
      handleFamilies({
        name: "address",
        value: results[0].formatted_address.replace(/, USA/g, "")
      });
    });
  };

  const { handleFamilies, families } = props;
  return (
    <PlacesAutocomplete
      value={families.contact.address}
      onChange={e => handleFamilies({ name: "address", value: e })}
      onSelect={handleSelect}
      debounce={500}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <Input
            {...getInputProps({
              placeholder: "",
              className: "location-search-input"
            })}
            autoComplete="new-pw"
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {
                    backgroundColor: "#ddd",
                    cursor: "pointer",
                    margin: "10px 0"
                  }
                : {
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    margin: "10px 0"
                  };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                >
                  <span>{suggestion.description}</span>
                  <Divider />
                </div>
              );
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
