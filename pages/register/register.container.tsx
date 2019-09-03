import { Component } from "react";
import RegisterView from "./register.view";
import api from "../../src/utils/api";
import moment from "moment";

class RegisterContainer extends Component<any, any> {
  static getInitialProps = ({ query }) => {
    return { query };
  };

  getInitialState = () => {
    const { query } = this.props;
    if (query["lazy"] === "1") {
      const state = {
        amountOfChildren: 2,
        families: {
          father: "Jonathan Mai",
          mother: "Lanvi Nguyen",
          contact: {
            phone: "7143931104",
            email: "h.jmai2791@gmail.com",
            address: "2791 cibola avenue, costa mesa, ca 92626"
          }
        },
        children: {
          0: {
            saintName: "St John the Baptist",
            name: "Jon Jr",
            birthday: "08/09/1993",
            grade: 10
          },
          1: {
            saintName: "St Cecilia",
            name: "Sen Hoa",
            birthday: "09/21/2010",
            grade: 12
          }
        },
        contactPermission: "true",
        socialMediaPermission: "true",
        agreement: true
      };
      return state;
    }
    return {
      amountOfChildren: 0,
      families: {
        father: "",
        mother: "",
        contact: {
          phone: "",
          email: "",
          address: ""
        }
      },
      children: {},
      contactPermission: null,
      socialMediaPermission: null,
      agreement: false
    };
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  handleAmount = amountOfChildren => {
    this.setState({
      amountOfChildren
    });
  };

  handleFamilies = target => {
    const { name, value } = target;
    const isContactInfo = ["phone", "email", "address"].indexOf(name) > -1;
    this.setState({
      families: {
        ...this.state.families,
        [isContactInfo ? "contact" : name]: isContactInfo
          ? { ...this.state.families.contact, [name]: value }
          : value
      }
    });
  };

  handleChild = (target, index) => {
    const { name, value } = target;
    this.setState({
      children: {
        ...this.state.children,
        [index]: {
          ...this.state.children[index],
          [name]: value
        }
      }
    });
  };

  handleSocialMedia = target => {
    const socialMediaPermission = target.value;
    this.setState({ socialMediaPermission });
  };

  handleContact = target => {
    const contactPermission = target.value;
    this.setState({ contactPermission });
  };

  handleAgreement = target => {
    const agreement = !(target.value === "true");
    this.setState({ agreement });
  };

  createChild = async family => {
    const children = [];
    const childKeys = Object.keys(this.state.children);
    childKeys.forEach(async key => {
      const child = {
        ...this.state.children[key],
        family: family._id,
        parents: {
          father: family.father,
          mother: family.mother
        },
        dateRegistered: moment
          .utc(Date.now())
          .local()
          .format("MM/DD/YYYY")
      };
      const childResponse = await api.createStudent(child);
      children.push(child);
    });
    return children;
  };

  createFamily = () => {
    const currentDate = moment
      .utc(Date.now())
      .local()
      .format("MM/DD/YYYY");
    return {
      ...this.state.families,
      yearsRegistered: [currentDate],
      dateRegistered: moment
        .utc(Date.now())
        .local()
        .format("MM/DD/YYYY")
    };
  };

  handleSubmission = async () => {
    const family = this.createFamily();
    const familyResponse = await api.createFamily(family);
    this.createChild(familyResponse.data);
  };

  async componentDidMount() {}

  render() {
    return (
      <RegisterView
        {...this.state}
        {...this.props}
        handleAmount={this.handleAmount}
        handleFamilies={this.handleFamilies}
        handleChild={this.handleChild}
        handleSocialMedia={this.handleSocialMedia}
        handleContact={this.handleContact}
        handleAgreement={this.handleAgreement}
        handleSubmission={this.handleSubmission}
      />
    );
  }
}

export default RegisterContainer;
