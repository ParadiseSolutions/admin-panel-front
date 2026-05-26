import {
  setDecimalFormat,
  setRateFormat,
  calcDeposit,
  setDecimalFormatVBalance,
  setYouSaveFormat,
} from "../../../../Utils/CommonFunctions";

export const createProviderPricingCalc = (ctx) => () => {

    // esto es net price en price sheet select
    let netPriceInput = ctx.validationType.values.net_rate;
    let publicPriceInput = ctx.validationType.values.public_price;
    let estCommissionInput = ctx.validationType.values.p_est_commission;
    let rateInput = ctx.validationType.values.rate;
    let commissionFixedInput = ctx.validationType.values.p_commission;
    // net price
    let baseAmountInput = ctx.validationType.values.p_base_amount;
    let ivaInput = ctx.validationType.values.p_iva;
    let gratuityInput = ctx.validationType.values.p_gratuity;
    // rate %
    let netPriceInputRate = ctx.validationType.values.net_rate;
    let providerCommissionInputRate = ctx.validationType.values.provider_commission;
    // fixed commission
    let netPriceInputCommision = ctx.validationType.values.net_rate;
    if (
      ctx.priceSheetSelected === "1" &&
      netPriceInput !== "" &&
      publicPriceInput !== "" &&
      publicPriceInput > 0
    ) {
      ctx.validationType.setFieldValue(
        "p_est_rate",
        setRateFormat((publicPriceInput - netPriceInput) / publicPriceInput),
      );
      estCommissionInput = publicPriceInput - netPriceInput;
      ctx.validationType.setFieldValue(
        "p_est_commission",
        setDecimalFormat(estCommissionInput),
      );

      // tax_id
      // 1- Included
      // 2- Not Included
      // 3- Unspecified

      // gratuity_id
      // 1- Included
      // 2- Not Included
      // 3- Unspecified

      // gratuity_type_id
      // 3- Fixed Amount
      // 4- % Percent
      // 6- Unspecified

      if (
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 6)
      ) {
        // Tax - Yes . Gratuity - Un
        //If the Payment Settings indicate the Net Price includes taxes but not gratuity,
        // then this field would be calculated as:
        // [Net Price] / [1.16]
        gratuityInput = "";
        ctx.validationType.setFieldValue("p_gratuity", "");
        ctx.validationType.setFieldValue("t_gratuity", "");

        let totalPriceInput = +netPriceInput;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        baseAmountInput = setDecimalFormat(netPriceInput / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput),
        );
      } else if (
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 6) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 6)
      ) {
        // Tax - No . Gratuity - Un
        // If Payment Settings indicates that the Net Price does not include taxes or gratuity,
        // then this will be a straight reference, no calculation needed.
        gratuityInput = "";
        ctx.validationType.setFieldValue("p_gratuity", "");
        ctx.validationType.setFieldValue("t_gratuity", "");

        baseAmountInput = setDecimalFormat(+netPriceInput);

        ivaInput = baseAmountInput * 0.16;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput),
        );
      } else if (
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 4)
      ) {
        // Tax - Yes . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:
        let totalPriceInput = +netPriceInput;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        baseAmountInput = setDecimalFormat(netPriceInput / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        if (ctx.tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +ctx.tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+ctx.tourData.based_on_id === 1) {
            // 1- Net Price
            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price
            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              baseAmountInput = setDecimalFormat(
                publicPriceInput / (1.16 + +ctx.tourData.gratuity / 100),
              );

              ivaInput = baseAmountInput * 0.16;
              ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

              totalPriceInput = +baseAmountInput + +ivaInput;
              ctx.validationType.setFieldValue(
                "p_total_price",
                setDecimalFormat(+totalPriceInput),
              );

              gratuityInput = (+ctx.tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              totalPriceInput = +publicPriceInput;
              ctx.validationType.setFieldValue(
                "p_total_price",
                setDecimalFormat(+totalPriceInput),
              );

              baseAmountInput = setDecimalFormat(publicPriceInput / 1.16);

              ivaInput = totalPriceInput - baseAmountInput;
              ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

              gratuityInput = (+ctx.tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        ctx.validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput),
        );
        ctx.validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput),
        );
      } else if (
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 4) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 4)
      ) {
        // Tax - No/Un . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:

        baseAmountInput = setDecimalFormat(netPriceInput);

        ivaInput = baseAmountInput * 0.16;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        if (ctx.tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +ctx.tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+ctx.tourData.based_on_id === 1) {
            // 1- Net Price
            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price

            baseAmountInput = setDecimalFormat(+publicPriceInput);

            ivaInput = baseAmountInput * 0.16;
            ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            totalPriceInput = +baseAmountInput + +ivaInput;
            ctx.validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput),
            );

            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        ctx.validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput),
        );
        ctx.validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput),
        );
      }
      ctx.validationType.setFieldValue(
        "p_base_amount",
        setDecimalFormat(baseAmountInput),
      );
    }

    if (
      ctx.priceSheetSelected === "2" &&
      publicPriceInput !== "" &&
      rateInput !== "" &&
      publicPriceInput > 0
    ) {
      netPriceInputRate = publicPriceInput * (1 - rateInput / 100);
      ctx.validationType.setFieldValue(
        "net_rate",
        setDecimalFormat(netPriceInputRate),
      );
      providerCommissionInputRate = publicPriceInput * (rateInput / 100);
      ctx.validationType.setFieldValue(
        "provider_commission",
        setDecimalFormat(providerCommissionInputRate),
      );

      if (
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 6)
      ) {
        // Tax - Yes . Gratuity - No
        //If the Payment Settings indicate the Net Price includes taxes but not gratuity,
        // then this field would be calculated as:
        // [Net Price] / [1.16]
        gratuityInput = "";

        ctx.validationType.setFieldValue("p_gratuity", "");
        ctx.validationType.setFieldValue("t_gratuity", "");

        let totalPriceInput = +netPriceInputRate;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        baseAmountInput = setDecimalFormat(netPriceInputRate / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput),
        );
      } else if (
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 6) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 6)
      ) {
        // Tax - No . Gratuity - No
        // If Payment Settings indicates that the Net Price does not include taxes or gratuity,
        // then this will be a straight reference, no calculation needed.
        gratuityInput = "";

        ctx.validationType.setFieldValue("p_gratuity", "");
        ctx.validationType.setFieldValue("t_gratuity", "");

        baseAmountInput = setDecimalFormat(netPriceInputRate);

        ivaInput = baseAmountInput * 0.16;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput),
        );
      } else if (
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 4)
      ) {
        // Tax - Yes . Gratuity - Yes - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:
        let totalPriceInput = +netPriceInputRate;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        baseAmountInput = setDecimalFormat(netPriceInputRate / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        if (ctx.tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +ctx.tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+ctx.tourData.based_on_id === 1) {
            // 1- Net Price
            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price

            totalPriceInput = +publicPriceInput;
            ctx.validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput),
            );

            baseAmountInput = setDecimalFormat(publicPriceInput / 1.16);

            ivaInput = totalPriceInput - baseAmountInput;
            ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        ctx.validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput),
        );
        ctx.validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput),
        );
      } else if (
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 4) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 4)
      ) {
        // Tax - No/Un . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:

        baseAmountInput = setDecimalFormat(netPriceInputRate);

        ivaInput = baseAmountInput * 0.16;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        if (ctx.tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +ctx.tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+ctx.tourData.based_on_id === 1) {
            // 1- Net Price
            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price

            baseAmountInput = setDecimalFormat(+publicPriceInput);

            ivaInput = baseAmountInput * 0.16;
            ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            totalPriceInput = +baseAmountInput + +ivaInput;
            ctx.validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput),
            );

            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        ctx.validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput),
        );
        ctx.validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput),
        );
      }
      ctx.validationType.setFieldValue(
        "p_base_amount",
        setDecimalFormat(baseAmountInput),
      );
    }

    if (
      ctx.priceSheetSelected === "3" &&
      publicPriceInput !== "" &&
      commissionFixedInput !== "" &&
      publicPriceInput > 0
    ) {
      netPriceInputCommision = publicPriceInput - commissionFixedInput;
      ctx.validationType.setFieldValue(
        "net_rate",
        setDecimalFormat(netPriceInputCommision),
      );
      ctx.validationType.setFieldValue(
        "p_est_rate",
        setRateFormat(commissionFixedInput / publicPriceInput),
      );

      if (
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 6)
      ) {
        // Tax - Yes . Gratuity - No
        //If the Payment Settings indicate the Net Price includes taxes but not gratuity,
        // then this field would be calculated as:
        // [Net Price] / [1.16]
        gratuityInput = "";

        ctx.validationType.setFieldValue("p_gratuity", "");
        ctx.validationType.setFieldValue("t_gratuity", "");

        let totalPriceInput = +netPriceInputCommision;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );
        baseAmountInput = setDecimalFormat(netPriceInputCommision / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput),
        );
      } else if (
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 6) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_id === 3) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 6)
      ) {
        // Tax - No . Gratuity - No
        // If Payment Settings indicates that the Net Price does not include taxes or gratuity,
        // then this will be a straight reference, no calculation needed.
        gratuityInput = "";

        ctx.validationType.setFieldValue("p_gratuity", "");
        ctx.validationType.setFieldValue("t_gratuity", "");

        baseAmountInput = setDecimalFormat(+netPriceInputCommision);

        ivaInput = baseAmountInput * 0.16;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput),
        );
      } else if (
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 4)
      ) {
        // Tax - Yes . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:
        let totalPriceInput = +netPriceInputCommision;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        baseAmountInput = setDecimalFormat(netPriceInputCommision / 1.16);

        ivaInput = totalPriceInput - baseAmountInput;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        if (ctx.tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +ctx.tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+ctx.tourData.based_on_id === 1) {
            // 1- Net Price
            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price
            totalPriceInput = +publicPriceInput;
            ctx.validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput),
            );

            baseAmountInput = setDecimalFormat(+publicPriceInput / 1.16);

            ivaInput = totalPriceInput - baseAmountInput;
            ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        ctx.validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput),
        );
        ctx.validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput),
        );
      } else if (
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 3) ||
        (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 4) ||
        (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 4)
      ) {
        // Tax - No/Un . Gratuity - Fixed Amount
        // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:

        baseAmountInput = setDecimalFormat(netPriceInputCommision);

        ivaInput = baseAmountInput * 0.16;
        ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

        let totalPriceInput = +baseAmountInput + +ivaInput;
        ctx.validationType.setFieldValue(
          "p_total_price",
          setDecimalFormat(+totalPriceInput),
        );

        if (ctx.tourData.gratuity_type_id === 3) {
          // Fixed
          gratuityInput = +ctx.tourData.gratuity;
        } else {
          // Percent

          // Based On
          // 1- Net Price
          // 2- Public Price

          // Apply
          // 1- Before
          // 2- After
          if (+ctx.tourData.based_on_id === 1) {
            // 1- Net Price
            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * totalPriceInput) / 100;
            }
          } else {
            // 2- Public Price
            baseAmountInput = setDecimalFormat(netPriceInputCommision);

            ivaInput = baseAmountInput * 0.16;
            ctx.validationType.setFieldValue("p_iva", setDecimalFormat(ivaInput));

            totalPriceInput = +baseAmountInput + +ivaInput;
            ctx.validationType.setFieldValue(
              "p_total_price",
              setDecimalFormat(+totalPriceInput),
            );
            if (+ctx.tourData.payment_apply_id === 1) {
              // 1- Before
              gratuityInput = (+ctx.tourData.gratuity * +baseAmountInput) / 100;
            } else {
              // 2- After
              gratuityInput = (+ctx.tourData.gratuity * +totalPriceInput) / 100;
            }
          }
        }
        ctx.validationType.setFieldValue(
          "p_gratuity",
          setDecimalFormat(gratuityInput),
        );
        ctx.validationType.setFieldValue(
          "t_gratuity",
          setDecimalFormat(gratuityInput),
        );

        ctx.validationType.setFieldValue(
          "p_final_total",
          setDecimalFormat(+totalPriceInput + +gratuityInput),
        );
      }
      ctx.validationType.setFieldValue(
        "p_base_amount",
        setDecimalFormat(baseAmountInput),
      );
    }
    return gratuityInput;
};

export const createOurPricingCalc = (ctx) => (gratuityInput) => {

    let ourPriceInput = ctx.validationType.values.our_price;
    let netPriceInput = ctx.validationType.values.net_rate;
    let ourCommisionPricing = ourPriceInput - netPriceInput;
    let depositInput = ctx.validationType.values.deposit;
    let baseAmountInput = ctx.validationType.values.t_base_amount;
    let ivaInput = ctx.validationType.values.t_iva;
    ctx.setOurCommission(setDecimalFormat(ourCommisionPricing));
    if (
      ctx.validationType.values.public_price !== null &&
      ctx.validationType.values.public_price !== "" &&
      ctx.validationType.values.public_price !== "0"
    ) {
      ctx.validationType.setFieldValue(
        "eff_rate",
        setRateFormat(
          ourCommisionPricing / ctx.validationType.values.public_price,
          1,
        ),
      );
    } else if (
      ctx.validationType.values.net_rate !== null &&
      ctx.validationType.values.net_rate !== "" &&
      ctx.validationType.values.net_rate !== "0" &&
      ourCommisionPricing > 0
    ) {
      ctx.validationType.setFieldValue(
        "eff_rate",
        setRateFormat(
          ourCommisionPricing /
            (+ctx.validationType.values.net_rate + +ourCommisionPricing),
          1,
        ),
      );
    }
    if (
      ctx.validationType.values.our_price !== "" &&
      ctx.priceCollectNameSelected !== ""
    ) {
      depositInput = calcDeposit(
        ourPriceInput,
        ctx.priceCollectNameSelected,
        ourCommisionPricing,
        depositInput,
      );
      ctx.validationType.setFieldValue("deposit", depositInput);
    }

    if (
      ourPriceInput !== "" &&
      depositInput !== "" &&
      ctx.currencySelected === "USD"
    ) {
      ctx.validationType.setFieldValue(
        "voucher_balance",
        setDecimalFormatVBalance(
          ourPriceInput - depositInput,
          ctx.currencySelected,
        ),
      );
    }

    if (
      (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_id === 3) ||
      (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 6)
    ) {
      // Tax - Yes . Gratuity - No
      //If the Payment Settings indicate the Net Price includes taxes but not gratuity,
      // then this field would be calculated as:
      // [Net Price] / [1.16]

      let totalPriceInput = +ourPriceInput;
      ctx.validationType.setFieldValue(
        "t_total_price",
        setDecimalFormat(+totalPriceInput),
      );

      baseAmountInput = setDecimalFormat(ourPriceInput / 1.16);

      ivaInput = totalPriceInput - baseAmountInput;
      ctx.validationType.setFieldValue("t_iva", setDecimalFormat(ivaInput));

      ctx.validationType.setFieldValue(
        "t_final_total",
        setDecimalFormat(+totalPriceInput),
      );
    } else if (
      (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_id === 3) ||
      (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 6) ||
      (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_id === 3) ||
      (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 6)
    ) {
      // Tax - No . Gratuity - No
      // If Payment Settings indicates that the Net Price does not include taxes or gratuity,
      // then this will be a straight reference, no calculation needed.

      baseAmountInput = setDecimalFormat(ourPriceInput);

      ivaInput = baseAmountInput * 0.16;
      ctx.validationType.setFieldValue("t_iva", setDecimalFormat(ivaInput));

      let totalPriceInput = +baseAmountInput + +ivaInput;
      ctx.validationType.setFieldValue(
        "t_total_price",
        setDecimalFormat(+totalPriceInput),
      );

      ctx.validationType.setFieldValue(
        "t_final_total",
        setDecimalFormat(+totalPriceInput),
      );
    } else if (
      (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 3) ||
      (ctx.tourData.tax_id === 1 && ctx.tourData.gratuity_type_id === 4)
    ) {
      // Tax - Yes . Gratuity - Fixed Amount
      // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:
      let totalPriceInput = +ourPriceInput;
      ctx.validationType.setFieldValue(
        "t_total_price",
        setDecimalFormat(+totalPriceInput),
      );

      baseAmountInput = setDecimalFormat(ourPriceInput / 1.16);

      ivaInput = totalPriceInput - baseAmountInput;
      ctx.validationType.setFieldValue("t_iva", setDecimalFormat(ivaInput));

      ctx.validationType.setFieldValue(
        "t_final_total",
        setDecimalFormat(+totalPriceInput + +gratuityInput),
      );
    } else if (
      (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 3) ||
      (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 3) ||
      (ctx.tourData.tax_id === 2 && ctx.tourData.gratuity_type_id === 4) ||
      (ctx.tourData.tax_id === 3 && ctx.tourData.gratuity_type_id === 4)
    ) {
      // Tax - No/Un . Gratuity - Fixed Amount
      // If the Payment Settings says the Net Rate includes Gratuity and Taxes then the calculation would be:

      baseAmountInput = setDecimalFormat(ourPriceInput);

      ivaInput = baseAmountInput * 0.16;
      ctx.validationType.setFieldValue("t_iva", setDecimalFormat(ivaInput));

      let totalPriceInput = +baseAmountInput + +ivaInput;
      ctx.validationType.setFieldValue(
        "t_total_price",
        setDecimalFormat(+totalPriceInput),
      );

      ctx.validationType.setFieldValue(
        "t_final_total",
        setDecimalFormat(+totalPriceInput + +gratuityInput),
      );
    }
    ctx.validationType.setFieldValue(
      "t_base_amount",
      setDecimalFormat(baseAmountInput),
    );
    if (
      ourPriceInput !== "" &&
      ctx.validationType.values.ship_price &&
      ctx.validationType.values.ship_price !== null &&
      ctx.validationType.values.ship_price !== "0.00" &&
      ctx.validationType.values.ship_price !== "0"
    ) {
      ctx.validationType.setFieldValue(
        "you_save",
        100 -
          setYouSaveFormat(ourPriceInput / ctx.validationType.values.ship_price),
      );
    } else if (
      ourPriceInput !== "" &&
      ctx.validationType.values.compare_at !== "" &&
      ctx.validationType.values.compare_at !== null &&
      ctx.validationType.values.compare_at !== "0.00" &&
      ctx.validationType.values.compare_at !== "0"
    ) {
      ctx.validationType.setFieldValue(
        "you_save",
        100 -
          setYouSaveFormat(ourPriceInput / ctx.validationType.values.compare_at),
      );
    }
    if (depositInput !== null && depositInput !== "" && depositInput !== 0) {
      ctx.validationType.setFieldValue(
        "net_price_fixed",
        (depositInput - ourCommisionPricing).toFixed(2),
      );
    }
    if (depositInput !== null && depositInput !== "" && depositInput !== 0) {
      ctx.validationType.setFieldValue(
        "net_price_percentage",
        (depositInput - ourCommisionPricing).toFixed(2),
      );
    }
    if (depositInput !== null && depositInput !== "" && depositInput !== 0) {
      ctx.validationType.setFieldValue(
        "net_price",
        (depositInput - ourCommisionPricing).toFixed(2),
      );
    }
};
