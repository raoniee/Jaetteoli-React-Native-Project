import { SvgXml } from "react-native-svg";

const Store = (props) => {
  return (
    <SvgXml
      xml={`
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
  <path d="M20.5 7.25C20.5 5.967 18.874 1.92 18.376 1.017C18.2896 0.860341 18.1627 0.729734 18.0086 0.6388C17.8546 0.547865 17.6789 0.499932 17.5 0.5H3.5C3.32283 0.499928 3.14883 0.546926 2.99579 0.636185C2.84275 0.725444 2.71617 0.853759 2.629 1.008C2.13 1.893 0.5 5.885 0.5 7.25C0.500436 7.6867 0.589259 8.1188 0.761118 8.52026C0.932978 8.92172 1.18432 9.28425 1.5 9.586V19.5C1.5 19.7652 1.60536 20.0196 1.79289 20.2071C1.98043 20.3946 2.23478 20.5 2.5 20.5H5.5C5.76522 20.5 6.01957 20.3946 6.20711 20.2071C6.39464 20.0196 6.5 19.7652 6.5 19.5V13.5H8.5V19.5C8.5 19.7652 8.60536 20.0196 8.79289 20.2071C8.98043 20.3946 9.23478 20.5 9.5 20.5H18.5C18.7652 20.5 19.0196 20.3946 19.2071 20.2071C19.3946 20.0196 19.5 19.7652 19.5 19.5V9.544C19.8104 9.24695 20.0586 8.89119 20.2303 8.49738C20.4019 8.10356 20.4936 7.67956 20.5 7.25ZM4.091 2.5H16.9C17.6406 4.00581 18.1786 5.60301 18.5 7.25C18.4795 7.57479 18.3412 7.88094 18.1111 8.11106C17.8809 8.34118 17.5748 8.47947 17.25 8.5C16.9186 8.49947 16.601 8.3676 16.3667 8.1333C16.1324 7.89899 16.0005 7.58136 16 7.25C16 6.98478 15.8946 6.73043 15.7071 6.54289C15.5196 6.35536 15.2652 6.25 15 6.25C14.7348 6.25 14.4804 6.35536 14.2929 6.54289C14.1054 6.73043 14 6.98478 14 7.25C14 7.58152 13.8683 7.89946 13.6339 8.13388C13.3995 8.3683 13.0815 8.5 12.75 8.5C12.4185 8.5 12.1005 8.3683 11.8661 8.13388C11.6317 7.89946 11.5 7.58152 11.5 7.25C11.5 6.98478 11.3946 6.73043 11.2071 6.54289C11.0196 6.35536 10.7652 6.25 10.5 6.25C10.2348 6.25 9.98043 6.35536 9.79289 6.54289C9.60536 6.73043 9.5 6.98478 9.5 7.25C9.5 7.58152 9.3683 7.89946 9.13388 8.13388C8.89946 8.3683 8.58152 8.5 8.25 8.5C7.91848 8.5 7.60054 8.3683 7.36612 8.13388C7.1317 7.89946 7 7.58152 7 7.25C7 6.98478 6.89464 6.73043 6.70711 6.54289C6.51957 6.35536 6.26522 6.25 6 6.25C5.73478 6.25 5.48043 6.35536 5.29289 6.54289C5.10536 6.73043 5 6.98478 5 7.25C4.99947 7.58136 4.86761 7.89899 4.6333 8.1333C4.39899 8.3676 4.08136 8.49947 3.75 8.5C3.41977 8.49585 3.10423 8.36282 2.8707 8.1293C2.63718 7.89577 2.50415 7.58023 2.5 7.25C2.80575 5.60009 3.34129 4.0012 4.091 2.5ZM17.5 18.5H10.5V12.5C10.5 12.2348 10.3946 11.9804 10.2071 11.7929C10.0196 11.6054 9.76522 11.5 9.5 11.5H5.5C5.23478 11.5 4.98043 11.6054 4.79289 11.7929C4.60536 11.9804 4.5 12.2348 4.5 12.5V18.5H3.5V10.475C3.584 10.481 3.664 10.5 3.75 10.5C4.58914 10.5003 5.3957 10.1752 6 9.593C6.60446 10.175 7.41091 10.5001 8.25 10.5001C9.08909 10.5001 9.89554 10.175 10.5 9.593C11.1045 10.175 11.9109 10.5001 12.75 10.5001C13.5891 10.5001 14.3955 10.175 15 9.593C15.6043 10.1752 16.4109 10.5003 17.25 10.5C17.335 10.5 17.416 10.48 17.5 10.473V18.5Z" fill=${props.stroke}/>
  <path d="M15.5 11.5H12.5C12.2348 11.5 11.9804 11.6054 11.7929 11.7929C11.6054 11.9804 11.5 12.2348 11.5 12.5V15.5C11.5 15.7652 11.6054 16.0196 11.7929 16.2071C11.9804 16.3946 12.2348 16.5 12.5 16.5H15.5C15.7652 16.5 16.0196 16.3946 16.2071 16.2071C16.3946 16.0196 16.5 15.7652 16.5 15.5V12.5C16.5 12.2348 16.3946 11.9804 16.2071 11.7929C16.0196 11.6054 15.7652 11.5 15.5 11.5ZM14.5 14.5H13.5V13.5H14.5V14.5Z" fill=${props.stroke}/>
</svg>
        `}
    />
  );
};

export default Store;