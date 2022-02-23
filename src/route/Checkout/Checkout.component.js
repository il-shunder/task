import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import ContentWrapper from "SourceComponent/ContentWrapper/ContentWrapper.component";
import ProgressBar from "Component/ProgressBar/ProgressBar.component";
import { appendWithStoreCode } from "SourceUtil/Url/Url";
import { CHECKOUT_URL } from "SourceRoute/Checkout/Checkout.config";
import "./Checkout.override.style.scss";

class Checkout extends SourceCheckout {
    constructor(props) {
        super(props);
        this.state = {
            progressBarActive: 0,
        };
    }

    renderProgressBarSteps() {
        const res = [];
        for (let key in this.stepMap) {
            res.push(this.stepMap[key].title.value);
        }
        return res;
    }

    renderProgressBarActive(step) {
        let i = 0;
        for (let key in this.stepMap) {
            if (this.stepMap[key].title.value === step) this.setState({ progressBarActive: i });
            i++;
        }
    }

    updateStep() {
        const { checkoutStep, history } = this.props;
        const { url } = this.stepMap[checkoutStep];
        const step = this.stepMap[checkoutStep].title.value;

        this.renderProgressBarActive(step);
        history.push(appendWithStoreCode(`${CHECKOUT_URL}${url}`));
    }

    render() {
        return (
            <main block="Checkout">
                <ProgressBar steps={this.renderProgressBarSteps()} active={this.state.progressBarActive} />
                <ContentWrapper wrapperMix={{ block: "Checkout", elem: "Wrapper" }} label={__("Checkout page")}>
                    {this.renderSummary(true)}
                    <div block="Checkout" elem="Step">
                        {this.renderTitle()}
                        {this.renderGuestForm()}
                        {this.renderStep()}
                        {this.renderLoader()}
                    </div>
                    <div>
                        {this.renderSummary()}
                        {this.renderPromo()}
                        {this.renderCoupon()}
                    </div>
                </ContentWrapper>
            </main>
        );
    }
}

export default Checkout;
