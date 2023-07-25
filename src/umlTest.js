export const uml = `<uml:Model xmi:version="20131001" xmlns:xmi="http://www.omg.org/spec/XMI/20131001" xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" xmlns:uml="http://www.eclipse.org/uml2/5.0.0/UML" xmi:id="_rLDqsCoGEe6FRIu9Cag54w" name="Foodsystem">
<packageImport xmi:type="uml:PackageImport" xmi:id="_rQKNICoGEe6FRIu9Cag54w">
  <importedPackage xmi:type="uml:Model" href="pathmap://UML_LIBRARIES/UMLPrimitiveTypes.library.uml#_0"/>
</packageImport>
<packagedElement xmi:type="uml:Package" xmi:id="_9VR_cCoGEe6FRIu9Cag54w" name="System">
  <packagedElement xmi:type="uml:UseCase" xmi:id="_BfhyUCoHEe6FRIu9Cag54w" name="Login Account"/>
  <packagedElement xmi:type="uml:UseCase" xmi:id="_GHcYoCoHEe6FRIu9Cag54w" name="Ordering Food">
    <include xmi:type="uml:Include" xmi:id="_kZfa0CoHEe6FRIu9Cag54w" addition="_BfhyUCoHEe6FRIu9Cag54w"/>
  </packagedElement>
  <packagedElement xmi:type="uml:UseCase" xmi:id="_JnSjoCoHEe6FRIu9Cag54w" name="Make Payment">
    <extensionPoint xmi:type="uml:ExtensionPoint" xmi:id="_pxpyUCoHEe6FRIu9Cag54w" name="ExtensionPoint1"/>
    <extensionPoint xmi:type="uml:ExtensionPoint" xmi:id="_qtr8wCoHEe6FRIu9Cag54w" name="ExtensionPoint2"/>
  </packagedElement>
  <packagedElement xmi:type="uml:UseCase" xmi:id="_OEiyECoHEe6FRIu9Cag54w" name="Paypal payment">
    <extend xmi:type="uml:Extend" xmi:id="_pxpLQCoHEe6FRIu9Cag54w" extendedCase="_JnSjoCoHEe6FRIu9Cag54w" extensionLocation="_pxpyUCoHEe6FRIu9Cag54w"/>
  </packagedElement>
  <packagedElement xmi:type="uml:UseCase" xmi:id="_PfiwcCoHEe6FRIu9Cag54w" name="Card Payment">
    <extend xmi:type="uml:Extend" xmi:id="_qtquoCoHEe6FRIu9Cag54w" extendedCase="_JnSjoCoHEe6FRIu9Cag54w" extensionLocation="_qtr8wCoHEe6FRIu9Cag54w"/>
  </packagedElement>
</packagedElement>
<packagedElement xmi:type="uml:Actor" xmi:id="_-4uIICoGEe6FRIu9Cag54w" name="Customer"/>
<packagedElement xmi:type="uml:Association" xmi:id="_XorawCoHEe6FRIu9Cag54w" name="Customer login account" visibility="public" memberEnd="_XosB0SoHEe6FRIu9Cag54w _XosB0ioHEe6FRIu9Cag54w">
  <eAnnotations xmi:type="ecore:EAnnotation" xmi:id="_XorawSoHEe6FRIu9Cag54w" source="org.eclipse.papyrus">
    <details xmi:type="ecore:EStringToStringMapEntry" xmi:id="_XosB0CoHEe6FRIu9Cag54w" key="nature" value="UML_Nature"/>
  </eAnnotations>
  <ownedEnd xmi:type="uml:Property" xmi:id="_XosB0SoHEe6FRIu9Cag54w" name="login account" type="_BfhyUCoHEe6FRIu9Cag54w" association="_XorawCoHEe6FRIu9Cag54w"/>
  <ownedEnd xmi:type="uml:Property" xmi:id="_XosB0ioHEe6FRIu9Cag54w" name="customer" type="_-4uIICoGEe6FRIu9Cag54w" association="_XorawCoHEe6FRIu9Cag54w"/>
</packagedElement>
<packagedElement xmi:type="uml:Association" xmi:id="_l-XG4CoHEe6FRIu9Cag54w" memberEnd="_l-Xt8SoHEe6FRIu9Cag54w _l-Xt8ioHEe6FRIu9Cag54w">
  <eAnnotations xmi:type="ecore:EAnnotation" xmi:id="_l-XG4SoHEe6FRIu9Cag54w" source="org.eclipse.papyrus">
    <details xmi:type="ecore:EStringToStringMapEntry" xmi:id="_l-Xt8CoHEe6FRIu9Cag54w" key="nature" value="UML_Nature"/>
  </eAnnotations>
  <ownedEnd xmi:type="uml:Property" xmi:id="_l-Xt8SoHEe6FRIu9Cag54w" name="ordering food" type="_GHcYoCoHEe6FRIu9Cag54w" association="_l-XG4CoHEe6FRIu9Cag54w"/>
  <ownedEnd xmi:type="uml:Property" xmi:id="_l-Xt8ioHEe6FRIu9Cag54w" name="customer" type="_-4uIICoGEe6FRIu9Cag54w" association="_l-XG4CoHEe6FRIu9Cag54w"/>
</packagedElement>
<packagedElement xmi:type="uml:Association" xmi:id="_nEHOACoHEe6FRIu9Cag54w" memberEnd="_nEH1EioHEe6FRIu9Cag54w _nEH1EyoHEe6FRIu9Cag54w">
  <eAnnotations xmi:type="ecore:EAnnotation" xmi:id="_nEH1ECoHEe6FRIu9Cag54w" source="org.eclipse.papyrus">
    <details xmi:type="ecore:EStringToStringMapEntry" xmi:id="_nEH1ESoHEe6FRIu9Cag54w" key="nature" value="UML_Nature"/>
  </eAnnotations>
  <ownedEnd xmi:type="uml:Property" xmi:id="_nEH1EioHEe6FRIu9Cag54w" name="make payment" type="_JnSjoCoHEe6FRIu9Cag54w" association="_nEHOACoHEe6FRIu9Cag54w"/>
  <ownedEnd xmi:type="uml:Property" xmi:id="_nEH1EyoHEe6FRIu9Cag54w" name="customer" type="_-4uIICoGEe6FRIu9Cag54w" association="_nEHOACoHEe6FRIu9Cag54w"/>
</packagedElement>
</uml:Model>`;

export const uml2 = `
<uml:Model xmi:version="20131001" xmlns:xmi="http://www.omg.org/spec/XMI/20131001" xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" xmlns:uml="http://www.eclipse.org/uml2/5.0.0/UML" xmi:id="_jP7J0Cr7Ee6gr5NGm7M24Q" name="Test">
<packageImport xmi:type="uml:PackageImport" xmi:id="_jQoUcCr7Ee6gr5NGm7M24Q">
  <importedPackage xmi:type="uml:Model" href="pathmap://UML_LIBRARIES/UMLPrimitiveTypes.library.uml#_0"/>
</packageImport>
<packagedElement xmi:type="uml:Package" xmi:id="_m8qhUCr7Ee6gr5NGm7M24Q" name="Upper">
  <packagedElement xmi:type="uml:Package" xmi:id="_oNoZ8Cr7Ee6gr5NGm7M24Q" name="Inner">
    <packagedElement xmi:type="uml:UseCase" xmi:id="_0U0OMCr7Ee6gr5NGm7M24Q" name="UseCase1">
      <extend xmi:type="uml:Extend" xmi:id="_5kbGoCr7Ee6gr5NGm7M24Q" extendedCase="_yTiS8Cr7Ee6gr5NGm7M24Q" extensionLocation="_5kfYECr7Ee6gr5NGm7M24Q"/>
    </packagedElement>
  </packagedElement>
  <packagedElement xmi:type="uml:Actor" xmi:id="_sQTlMCr7Ee6gr5NGm7M24Q" name="Inner Actor"/>
  <packagedElement xmi:type="uml:UseCase" xmi:id="_yTiS8Cr7Ee6gr5NGm7M24Q" name="One">
    <extensionPoint xmi:type="uml:ExtensionPoint" xmi:id="_5kfYECr7Ee6gr5NGm7M24Q" name="ExtensionPoint1"/>
    <include xmi:type="uml:Include" xmi:id="_-ZzhMCr7Ee6gr5NGm7M24Q" addition="_0U0OMCr7Ee6gr5NGm7M24Q"/>
  </packagedElement>
  <packagedElement xmi:type="uml:UseCase" xmi:id="_zT_qYCr7Ee6gr5NGm7M24Q" name="Two">
    <include xmi:type="uml:Include" xmi:id="_25kp8Cr7Ee6gr5NGm7M24Q" addition="_0U0OMCr7Ee6gr5NGm7M24Q"/>
  </packagedElement>
</packagedElement>
<packagedElement xmi:type="uml:Actor" xmi:id="_p23ooCr7Ee6gr5NGm7M24Q" name="Outer Actor"/>
<packagedElement xmi:type="uml:Association" xmi:id="_vtI4cCr7Ee6gr5NGm7M24Q" memberEnd="_vtNJ4Cr7Ee6gr5NGm7M24Q _vtNJ4Sr7Ee6gr5NGm7M24Q">
  <eAnnotations xmi:type="ecore:EAnnotation" xmi:id="_vtL7wCr7Ee6gr5NGm7M24Q" source="org.eclipse.papyrus">
    <details xmi:type="ecore:EStringToStringMapEntry" xmi:id="_vtL7wSr7Ee6gr5NGm7M24Q" key="nature" value="UML_Nature"/>
  </eAnnotations>
  <ownedEnd xmi:type="uml:Property" xmi:id="_vtNJ4Cr7Ee6gr5NGm7M24Q" name="inner actor" type="_sQTlMCr7Ee6gr5NGm7M24Q" association="_vtI4cCr7Ee6gr5NGm7M24Q"/>
  <ownedEnd xmi:type="uml:Property" xmi:id="_vtNJ4Sr7Ee6gr5NGm7M24Q" name="outer actor" type="_p23ooCr7Ee6gr5NGm7M24Q" association="_vtI4cCr7Ee6gr5NGm7M24Q"/>
</packagedElement>
</uml:Model>
`;
